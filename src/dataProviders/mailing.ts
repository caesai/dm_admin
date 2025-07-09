import axios from 'axios'
import { BASEURL } from 'src/api.ts'
import {IAdmin} from "src/types/Admin.ts";

export const sendMailing = async () => {
  return axios.post<IAdmin[]>(`${BASEURL}/mailing/`, {
    body: JSON.stringify({

    }),
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  })
}
