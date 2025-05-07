import axios from 'axios'
import { BASEURL } from 'src/api.ts'
import { ICity, ICityCreate } from 'src/types/City.ts'

export const GetCities = async () => {
  return await axios.get<ICity[]>(`${BASEURL}/dicts/cities`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  })
}

export const CreateCity = async (data: ICityCreate) => {
  return await axios.post(`${BASEURL}/dicts/cities`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  })
}

export const UpdateCity = async (data: ICity) => {
  return await axios.patch(`${BASEURL}/dicts/cities`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  })
}
