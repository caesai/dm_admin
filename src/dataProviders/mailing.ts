import axios from 'axios'
import { BASEURL } from 'src/api.ts'
import { IMailing, IMailingSend } from 'src/types/Mailing.ts'

export const getMailingList = async () => {
  return await axios.get<IMailing[]>(`${BASEURL}/mailing/`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  })
}

export const sendMailingContent = async (data: IMailingSend) => {
  return await axios.post<IMailingSend>(`${BASEURL}/mailing/send`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  })
}

export const sendMailingGroup = async (data: IMailingSend) => {
  return await axios.post<IMailingSend>(`${BASEURL}/mailing/media-group`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  })
}

export const deleteMailing = async (id: number) => {
  return await axios.delete(`${BASEURL}/mailing/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  })
}
