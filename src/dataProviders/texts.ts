import axios from 'axios'
import { BASEURL } from 'src/api.ts'
import { IConfirmation, IText } from 'src/types/Texts.ts'
import { IGreeting } from 'src/views/inviteLinks/Popups/NewGreetingPopup.tsx'

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

export const getTextByName = async (name: string) => {
  return await axios.get<IText>(`${BASEURL}/texts/by_name/${name}`, {
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

export const updateTextByName = async (name: string, data: IGreeting) => {
  return await axios.put(`${BASEURL}/texts/by_name/${name}`, data, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    },
  })
}

export const getConfirmationList = async () => {
  return await axios.get<IConfirmation[]>(`${BASEURL}/texts/confirmation/all`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  })
}

export const getConfirmationById = async (id: number) => {
  return await axios.get<IConfirmation>(`${BASEURL}/texts/confirmation/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  })
}

export const updateConfirmation = async (id: number, data: IConfirmation) => {
  return await axios.put(`${BASEURL}/texts/confirmation/${id}`, data, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    },
  })
}
