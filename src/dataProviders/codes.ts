import axios from 'axios'
import { BASEURL } from 'src/api.ts'
import { ICode } from 'src/types/Code.ts'

export const getCodesList = async () => {
  return await axios.get<ICode[]>(`${BASEURL}/codes/`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  })
}

export const getCodeById = async (id: number) => {
  return await axios.get<ICode>(`${BASEURL}/codes/by_id/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  })
}

export const createCode = async (data: ICode) => {
  return await axios.post<ICode>(`${BASEURL}/codes/`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  })
}
