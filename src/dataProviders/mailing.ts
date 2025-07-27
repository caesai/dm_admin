import axios from 'axios'
import { BASEURL } from 'src/api.ts'

export const sendMailingText = async (
  text: string,
  button_text: string | undefined,
  button_url: string | undefined,
  users_ids: string | null,
) => {
  const formData = new FormData()
  formData.append('text', text)
  if (button_text) formData.append('button_text', button_text)
  if (button_url) formData.append('button_url', button_url)
  if (users_ids) formData.append('users_ids', users_ids)

  return axios.post(`${BASEURL}/mailing/text`, formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'multipart/form-data',
    },
  })
}

export const sendMailingPhoto = async (photoFile: File | null) => {
  if (!photoFile) return

  const formData = new FormData()
  formData.append('photo', photoFile)

  return axios.post(`${BASEURL}/mailing/photo`, formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'multipart/form-data',
    },
  })
}

export const sendMailingDocument = async (documentFile: File | null) => {
  if (!documentFile) return

  const formData = new FormData()
  formData.append('document', documentFile)

  return axios.post(`${BASEURL}/mailing/document`, formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'multipart/form-data',
    },
  })
}
