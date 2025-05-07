import axios from 'axios'
import { BASEURL } from 'src/api.ts'
import { IAdmin } from 'src/types/Admin.ts'

export const getAdmins = async () => {
  return axios.get<IAdmin[]>(`${BASEURL}/administrators/`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  })
}

export const resetAdminPassword = async (admin_id: number, password: string) => {
  return axios.patch(
    `${BASEURL}/administrators/reset_password`,
    {
      admin_id,
      password,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    },
  )
}

export const setUserAdmin = async (user_id: number, admin_id: number) => {
  return await axios.post(
    `${BASEURL}/users/${user_id}/setAdmin`,
    {
      value: Number.isNaN(admin_id) ? null : admin_id,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    },
  )
}

export const createAdmin = async (admin: { login: string; password: string }) => {
  return await axios.post<IAdmin>(`${BASEURL}/administrators/`, admin, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  })
}

export const deleteAdmin = async (id: number) => {
  return await axios.delete(`${BASEURL}/administrators/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  })
}

export const changeActiveAdmin = async (id: number, is_active: boolean) => {
  return await axios.patch(
    `${BASEURL}/administrators/setActive`,
    {
      admin_id: id,
      is_active,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    },
  )
}
