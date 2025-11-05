import { FC, useEffect, useState } from 'react'
import { IBookingWithRestaurant } from 'src/types/Booking.ts'
import { BookingPopup } from 'src/views/users/UserPageViews/Modals/BookingPopup.tsx'
import { CCardGroup } from '@coreui/react-pro'
import { getBookings } from 'src/dataProviders/bookings.ts'
import toast from 'react-hot-toast'
import classNames from 'classnames'
import BookingsFilter from 'src/views/bookings/parts/BookingsFilter.tsx'
import { GetRestaurantList } from 'src/dataProviders/restaurants.ts'
import { IRestaurantWCity } from 'src/types/Restaurant.ts'
import BookingsTable from 'src/views/bookings/parts/BookingsTable.tsx'

const BookingsPage: FC = () => {
  const [bookings, setBookings] = useState<IBookingWithRestaurant[]>([])
  const [restaurants, setRestaurants] = useState<IRestaurantWCity[]>([])
  const [currentBooking, setCurrentBooking] = useState<IBookingWithRestaurant | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [itemsPerPage, setItemsPerPage] = useState<number>(20)
  const [totalItems, setTotalItems] = useState<number>(0)

  const loadRestaurants = async () => {
    const response = await GetRestaurantList()
    setRestaurants(response.data)
  }

  useEffect(() => {
    getBookings({
      page: currentPage,
      per_page: itemsPerPage,
    })
      .then((res) => {
        setBookings(res.data.bookings)
        setTotalItems(res.data.total)
      })
      .catch(() => toast.error('Что-то пошло не так'))
  }, [currentPage, itemsPerPage])

  useEffect(() => {
    loadRestaurants()
  }, [])

  return (
    <>
      <BookingPopup booking={[currentBooking, setCurrentBooking]} />
      <CCardGroup className={classNames('d-flex', 'flex-column', 'gap-4')}>
        <BookingsFilter restaurants={restaurants} setBookings={setBookings} />
        <BookingsTable
          bookings={bookings}
          perPage={[itemsPerPage, setItemsPerPage]}
          pageProps={[currentPage, setCurrentPage]}
          totalItems={totalItems}
          setCurrentBooking={setCurrentBooking}
        />
      </CCardGroup>
    </>
  )
}

export default BookingsPage
