import axios from 'axios'
import { BASEURL } from 'src/api.ts'
import { IUserFull, IUserList, IUserPreferences } from 'src/types/User.ts'
import { IBookingWithRestaurant } from 'src/types/Booking.ts'
import { IPagination } from 'src/types/Common.ts'

export const getUsers = async (page?: number, per_page?: number) => {
  return await axios.get<IUserList>(`${BASEURL}/users/`, {
    params: {
      page: page,
      per_page: per_page,
    },
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

export const getUserBySearch = async (id: number, type: 'tg_id' | 'phone') => {
  return await axios.get<IUserFull>(`${BASEURL}/users/search`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
    params: type === 'tg_id' ? { telegram_id: id } : { phone_number: id },
  })
}

export const getUserPreferences = async (id: number) => {
  return await axios.get<IUserPreferences>(`${BASEURL}/user-preferences/user/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  })
}

export const getUserLogs = async (id: number) => {
  return await axios.get(`${BASEURL}/user-logs/`, {
    params: {
      user_id: id,
    },
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  })
}

export const getUserBookings = async (id: number) => {
  return await axios.get<IBookingWithRestaurant[]>(`${BASEURL}/users/${id}/bookings`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  })
}

export const getUserEvents = async (id: number) => {
  return await axios.get(`${BASEURL}/users/${id}/events`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  })
}

export const GetUserBanquets = async (id: number, props: IPagination) => {
  return await axios.get(`${BASEURL}/users/${id}/banquet-requests`, {
    params: {
      page: props.page,
      per_page: props.per_page,
    },
    headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
  })
}
