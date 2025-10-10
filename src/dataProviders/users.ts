import axios from 'axios'
import { BASEURL } from 'src/api.ts'
import { IUserFull, IUserList, IUserPreferences } from 'src/types/User.ts'
import { IBookingWithRestaurant } from 'src/types/Booking.ts'

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
