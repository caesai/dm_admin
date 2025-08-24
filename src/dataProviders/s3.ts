import axios from 'axios'
import { BASEURL } from 'src/api.ts'

export interface IFileUpload {
  url: string
}

export const uploadFile = async (file: File, isVideo: boolean) => {
  const formData = new FormData()
  let fileToUpload: Blob | File = file
  if (!isVideo) {
    fileToUpload = await compressImage(file, 50)
  }
  formData.append('file', fileToUpload)
  console.log('Uploading file...')
  return axios.put<IFileUpload>(`${BASEURL}/s3/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    },
  })
}

async function compressImage(blobImg: any, percent: number) {
  const bitmap = await createImageBitmap(blobImg)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  canvas.width = bitmap.width
  canvas.height = bitmap.height
  ctx?.drawImage(bitmap, 0, 0)
  const dataUrl = canvas.toDataURL('image/jpeg', percent / 100)
  return dataURLToBlob(dataUrl)
}

var dataURLToBlob = function (dataURL: any) {
  const BASE64_MARKER = ';base64,'
  if (dataURL.indexOf(BASE64_MARKER) == -1) {
    var parts = dataURL.split(',')
    var contentType = parts[0].split(':')[1]
    var raw = parts[1]

    return new Blob([raw], { type: contentType })
  }

  var parts = dataURL.split(BASE64_MARKER)
  var contentType = parts[0].split(':')[1]
  var raw = window.atob(parts[1]) as any
  const rawLength = raw.length

  const uInt8Array = new Uint8Array(rawLength)

  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i)
  }

  return new Blob([uInt8Array], { type: contentType })
}
