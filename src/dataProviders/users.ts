import axios from 'axios'
import { BASEURL } from 'src/api.ts'
import { IUserFull, IUserList } from 'src/types/User.ts'

export const getUsers = async () => {
  return await axios.get<IUserList>(`${BASEURL}/users/`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
  })
}

export const getUserById = async (id: number) => {
  return await axios.get<IUserFull>(`${BASEURL}/users/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  })
}
