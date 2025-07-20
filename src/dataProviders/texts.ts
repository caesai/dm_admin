import axios from 'axios'
import { BASEURL } from 'src/api.ts'
import { IText } from 'src/types/Texts.ts'

export const getTextsList = async () => {
  return await axios.get<IText[]>(`${BASEURL}/texts/`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  })
}

export const getTextById = async (id: number) => {
  return await axios.get<IText>(`${BASEURL}/texts/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  })
}

export const updateTextById = async (id: number, data: IText) => {
  return await axios.put(`${BASEURL}/texts/${id}`, data, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    },
  })
}
