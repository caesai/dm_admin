import axios from 'axios'
import { BASEURL } from 'src/api.ts'
import { ICode } from 'src/types/Code.ts'

export const getCodes = async () => {
  return await axios.get<ICode[]>(`${BASEURL}/codes/`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  })
}
