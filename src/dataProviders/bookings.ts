import axios from 'axios'
import { BASEURL } from 'src/api.ts'
import { IBookingList } from 'src/types/Booking.ts'

interface getBookingProps extends IBookingFilterProps {
  page?: number
  per_page?: number
}

export type IBookingFilterProps = {
  search?: string
  restaurant_id?: number
  booking_status?: string
  booking_date_from?: string
  booking_date_to?: string
}

export const getBookings = async (props: getBookingProps) => {
  return await axios.get<IBookingList>(`${BASEURL}/bookings/`, {
    params: {
      page: props.page,
      per_page: props.per_page,
      search: props.search,
      restaurant_id: props.restaurant_id,
      booking_status: props.booking_status,
      booking_date_from: props.booking_date_from,
      booking_date_to: props.booking_date_to,
    },
    headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
  })
}
