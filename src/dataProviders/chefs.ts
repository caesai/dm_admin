import axios from 'axios'
import { BASEURL } from 'src/api.ts'
import { IChef } from 'src/types/Chef.ts'

export const GetChefsList = async () => {
  return await axios.get<IChef[]>(`${BASEURL}/chefs`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  })
}

export const UpdateChef = async (data: IChef) => {
  return await axios.patch<IChef>(`${BASEURL}/chefs`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  })
}

export const CreateChef = async (data: IChef) => {
  return await axios.post<IChef>(`${BASEURL}/chefs`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  })
}
