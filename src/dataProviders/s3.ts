import axios from 'axios'
import { BASEURL } from 'src/api.ts'

export interface IFileUpload {
  url: string
}

export const uploadFile = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  console.log('Uploading file...')
  return axios.put<IFileUpload>(`${BASEURL}/s3/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    },
  })
}

// var dataURLToBlob = function (dataURL: any) {
//   const BASE64_MARKER = ';base64,'
//   if (dataURL.indexOf(BASE64_MARKER) == -1) {
//     var parts = dataURL.split(',')
//     var contentType = parts[0].split(':')[1]
//     var raw = parts[1]
//
//     return new Blob([raw], { type: contentType })
//   }
//
//   var parts = dataURL.split(BASE64_MARKER)
//   var contentType = parts[0].split(':')[1]
//   var raw = window.atob(parts[1]) as any
//   const rawLength = raw.length
//
//   const uInt8Array = new Uint8Array(rawLength)
//
//   for (let i = 0; i < rawLength; ++i) {
//     uInt8Array[i] = raw.charCodeAt(i)
//   }
//
//   return new Blob([uInt8Array], { type: contentType })
// }
