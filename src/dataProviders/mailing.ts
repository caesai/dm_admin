import axios from 'axios'
import { BASEURL } from 'src/api.ts'
import {IAdmin} from "src/types/Admin.ts";

export const sendMailing = async (user_ids: number[] | null, text: string, document?: string) => {
  return axios.post<IAdmin[]>(
    `${BASEURL}/mailing/`,
    {
        user_ids,
        text,
        document: '',
        video: '',
        photo: ''
    },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    },
  )
}
