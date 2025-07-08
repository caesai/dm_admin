import axios from "axios";
import {BASEURL} from "src/api.ts";

export interface IFileUpload {
  url: string;
}

export const uploadFile = async (file: File) => {
  const formData = new FormData()
  const compressedFile = await compressImage(file, 50);
  formData.append('file', compressedFile);
  console.log('compressed!');
  return axios.put<IFileUpload>(`${BASEURL}/s3/upload/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + localStorage.getItem('access_token')
    }
  })
}

async function compressImage(blobImg: any, percent: number) {
  let bitmap = await createImageBitmap(blobImg);
  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext("2d");
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  ctx?.drawImage(bitmap, 0, 0);
  let dataUrl = canvas.toDataURL("image/jpeg", percent/100);
  return dataURLToBlob(dataUrl);
}

var dataURLToBlob = function(dataURL: any) {
  var BASE64_MARKER = ';base64,';
  if (dataURL.indexOf(BASE64_MARKER) == -1) {
    var parts = dataURL.split(',');
    var contentType = parts[0].split(':')[1];
    var raw = parts[1];

    return new Blob([raw], {type: contentType});
  }

  var parts = dataURL.split(BASE64_MARKER);
  var contentType = parts[0].split(':')[1];
  var raw = window.atob(parts[1]) as any;
  var rawLength = raw.length;

  var uInt8Array = new Uint8Array(rawLength);

  for (var i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  return new Blob([uInt8Array], {type: contentType});
}
