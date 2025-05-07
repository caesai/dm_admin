import axios from "axios";
import {BASEURL} from "src/api.ts";

export interface IFileUpload {
  url: string;
}

export const uploadFile = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  return axios.put<IFileUpload>(`${BASEURL}/s3/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + localStorage.getItem('access_token')
    }
  })
}
