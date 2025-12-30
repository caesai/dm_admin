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

export const getMailingPreview = async (restaurants: number[] | null) => {
  return await axios.get(`${BASEURL}/mailing/preview-count`, {
    params: { restaurant_ids: restaurants },
    paramsSerializer: () => {
      const searchParams = new URLSearchParams()
      if (restaurants && restaurants.length > 0) {
        restaurants.forEach((id) => {
          searchParams.append('restaurant_ids', id.toString())
        })
      }
      return searchParams.toString()
    },
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  })
}

export const getMailingStatistics = async (id: number) => {
  return await axios.get(`${BASEURL}/mailing/statistics`, {
    params: { mailing_id: id },
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  })
}
