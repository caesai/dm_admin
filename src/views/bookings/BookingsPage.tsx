import { FC, useEffect, useState } from 'react'
import { IBookingWithRestaurant } from 'src/types/Booking.ts'
import { BookingPopup } from 'src/views/users/UserPageViews/Modals/BookingPopup.tsx'
import { CCard, CCardBody, CSmartTable } from '@coreui/react-pro'
import { Item } from '@coreui/react-pro/src/components/smart-table/types.ts'
import { RestaurantCityCell } from 'src/views/users/UserPageViews/UserBookings.tsx'
import { getBookings } from 'src/dataProviders/bookings.ts'
import toast from 'react-hot-toast'

const BookingsPage: FC = () => {
  const [bookings, setBookings] = useState<IBookingWithRestaurant[]>([])
  const [currentBooking, setCurrentBooking] = useState<IBookingWithRestaurant | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [itemsPerPage, setItemsPerPage] = useState<number>(20)
  const [totalItems, setTotalItems] = useState<number>(0)

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

  const cols = [
    {
      key: 'name',
      label: 'Клиент',
      _props: { scope: 'col' },
    },
    {
      key: 'restaurant_name',
      label: 'Ресторан',
      _props: { scope: 'col' },
    },
    {
      key: 'restaurant_id',
      label: 'Город',
      _props: { scope: 'col' },
    },
    {
      key: 'booking_date',
      label: 'Дата',
      _props: { scope: 'col' },
    },
    {
      key: 'time',
      label: 'Время',
      _props: { scope: 'col' },
    },
    {
      key: 'duration',
      label: 'Длительность',
      _props: { scope: 'col' },
    },
    {
      key: 'booking_status',
      label: 'Статус',
      _props: { scope: 'col' },
    },
    {
      key: 'guests_count',
      label: 'Гости',
      _props: { scope: 'col' },
    },
    {
      key: 'children_count',
      label: 'Дети',
      _props: { scope: 'col' },
    },
    {
      key: 'remarked_comment',
      label: 'Комментарий в Ремаркед',
      _props: {
        scope: 'col',
        style: { width: '30%' },
      },
    },
  ]

  return (
    <>
      <BookingPopup booking={[currentBooking, setCurrentBooking]} />
      {bookings.length > 0 ? (
        <CSmartTable
          columns={cols}
          items={bookings}
          columnFilter
          columnSorter
          clickableRows
          itemsPerPageSelect
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={setItemsPerPage}
          itemsPerPageOptions={[10, 20, 50, 100]}
          pagination
          paginationProps={{
            pages: Math.ceil(totalItems / itemsPerPage),
            activePage: currentPage,
            onActivePageChange: setCurrentPage,
          }}
          onRowClick={(item: Item) => setCurrentBooking(item as IBookingWithRestaurant)}
          tableHeadProps={{
            className: 'align-middle',
          }}
          tableProps={{
            striped: true,
            hover: true,
            className: 'align-middle',
          }}
          scopedColumns={{
            duration: (item: Item) => <td>{item.duration} мин</td>,
            restaurant_id: (item: Item) => <RestaurantCityCell restaurantId={item.restaurant_id} />,
          }}
        />
      ) : (
        <CCard>
          <CCardBody>У пользователя нет бронирований</CCardBody>
        </CCard>
      )}
    </>
  )
}

export default BookingsPage
