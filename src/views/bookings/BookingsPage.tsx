import { FC, useEffect, useState } from 'react'
import { IBookingWithRestaurant } from 'src/types/Booking.ts'
import { TablePopup } from 'src/components/TablePopup.tsx'
import { CCardGroup } from '@coreui/react-pro'
import { getBookings, IBookingFilterProps } from 'src/dataProviders/bookings.ts'
import toast from 'react-hot-toast'
import classNames from 'classnames'
import BookingsFilter from 'src/views/bookings/parts/BookingsFilter.tsx'
import { GetRestaurantList } from 'src/dataProviders/restaurants.ts'
import { IRestaurantWCity } from 'src/types/Restaurant.ts'
import BookingsTable from 'src/views/bookings/parts/BookingsTable.tsx'

const initFilters: IBookingFilterProps = {
  search: '',
  restaurant_id: 0,
  booking_status: '',
}

const BookingsPage: FC = () => {
  const [bookings, setBookings] = useState<IBookingWithRestaurant[]>([])
  const [restaurants, setRestaurants] = useState<IRestaurantWCity[]>([])
  const [currentBooking, setCurrentBooking] = useState<IBookingWithRestaurant | null>(null)
  const [currentFilters, setFilters] = useState<IBookingFilterProps>(initFilters)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [itemsPerPage, setItemsPerPage] = useState<number>(20)
  const [totalItems, setTotalItems] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)

  const loadRestaurants = async () => {
    const response = await GetRestaurantList()
    setRestaurants(response.data)
  }

  const loadBookings = async () => {
    setLoading(true)
    getBookings({
      page: currentPage,
      per_page: itemsPerPage,
      search: currentFilters.search !== '' ? currentFilters.search : undefined,
      restaurant_id: currentFilters.restaurant_id !== 0 ? currentFilters.restaurant_id : undefined,
      booking_status:
        currentFilters.booking_status !== '' ? currentFilters.booking_status : undefined,
    })
      .then((res) => {
        setBookings(res.data.bookings)
        setTotalItems(res.data.total!)
      })
      .catch(() => toast.error('Что-то пошло не так'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    void loadBookings()
  }, [currentPage, itemsPerPage])

  useEffect(() => {
    void loadRestaurants()
  }, [])

  return (
    <>
      <TablePopup data={[currentBooking, setCurrentBooking]} title={'Бронирование'} />
      <CCardGroup className={classNames('d-flex', 'flex-column', 'gap-4')}>
        <BookingsFilter
          restaurants={restaurants}
          filters={[currentFilters, setFilters]}
          sendFilters={loadBookings}
          loading={loading}
        />
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
