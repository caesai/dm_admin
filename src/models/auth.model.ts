import axios from 'axios'
import { BASEURL } from 'src/api.ts'
import { IAuthData } from 'src/types/Auth.ts'

export const sendLogin = async (login: string, password: string) => {
  return await axios.post<IAuthData>(`${BASEURL}/auth/login`, { login, password })
}

export const writeAuthData = async (data: IAuthData) => {
  localStorage.setItem('access_token', data.access_token)
  localStorage.setItem('expires_in', String(data.expires))
}

export const logout = async () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('expires_in')
}
