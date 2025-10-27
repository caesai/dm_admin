import {
  IRestaurantAdditional,
  IRestaurantBanquet,
  IRestaurantInfo,
  IRestaurantOptions,
} from 'src/types/Restaurant.ts'
import axios from 'axios'
import { BASEURL } from 'src/api.ts'

export const GetRestaurantOptions = async (id: number) => {
  return await axios.get<IRestaurantOptions>(`${BASEURL}/banquet-options/restaurant/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  })
}

export const CreateBanquetOptions = async (data: IRestaurantBanquet, restaurant_id: number) => {
  return await axios.post<IRestaurantBanquet>(
    `${BASEURL}/banquet-options/restaurant/${restaurant_id}/banquet-options`,
    { ...data, restaurant_id },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    },
  )
}

export const CreateAdditionalOptions = async (
  data: IRestaurantAdditional,
  restaurant_id: number,
) => {
  return await axios.post<IRestaurantAdditional>(
    `${BASEURL}/banquet-options/restaurant/${restaurant_id}/additional-options`,
    { ...data, restaurant_id },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    },
  )
}

export const SendRestaurantOptions = async (data: IRestaurantInfo, restaurant_id: number) => {
  return await axios.post<IRestaurantInfo>(
    `${BASEURL}/restaurant-banquet/restaurant/${restaurant_id}`,
    { ...data, restaurant_id },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    },
  )
}

export const SendBanquetsOptions = async (data: IRestaurantBanquet, banquet_id: number) => {
  return await axios.put<IRestaurantBanquet>(
    `${BASEURL}/banquet-options/banquet-options/${banquet_id}`,
    { ...data, banquet_id },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    },
  )
}

export const SendAdditionalOptions = async (data: IRestaurantAdditional, option_id: number) => {
  return await axios.put<IRestaurantBanquet>(
    `${BASEURL}/banquet-options/additional-options/${option_id}`,
    { ...data },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    },
  )
}

export const DeleteBanquetsOptions = async (banquet_id: number) => {
  return await axios.delete(`${BASEURL}/banquet-options/banquet-options/${banquet_id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  })
}

export const DeleteAdditionalOption = async (option_id: number) => {
  return await axios.delete(`${BASEURL}/banquet-options/additional-options/${option_id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  })
}
