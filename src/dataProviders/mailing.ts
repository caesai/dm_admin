import axios from 'axios'
import { BASEURL } from 'src/api.ts'
import {IAdmin} from "src/types/Admin.ts";

export const sendMailing = async (
    users_ids: number[] | null,
    text: string, photo: string | null,
    document: string | null,
    button_text: string | undefined,
    button_url: string | undefined,
) => {
  return axios.post<IAdmin[]>(
    `${BASEURL}/mailing/`,
    {
        users_ids,
        text,
        document,
        video: '',
        photo,
        button_text,
        button_url
    },
    {
      headers: {
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    },
  )
}
