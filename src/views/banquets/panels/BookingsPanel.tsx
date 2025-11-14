import { FC, useEffect, useState } from 'react'
import { CSmartTable, CTabPanel } from '@coreui/react-pro'
import { Item } from '@coreui/react-pro/src/components/smart-table/types.ts'
import { IBookingWithRestaurant } from 'src/types/Booking.ts'
import { RestaurantCityCell } from 'src/views/users/UserPageViews/UserBookings.tsx'
import { GetBanquetBookings } from 'src/dataProviders/banquets.ts'
import toast from 'react-hot-toast'
import classNames from 'classnames'

const BookingsPanel: FC = () => {
  const [bookings, setBookings] = useState<IBookingWithRestaurant[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [itemsPerPage, setItemsPerPage] = useState<number>(20)
  const [totalItems, setTotalItems] = useState<number>(0)

  const loadBookings = async () => {
    GetBanquetBookings({
      page: currentPage,
      per_page: itemsPerPage,
    })
      .then((res) => {
        setBookings(res.data.requests)
        setTotalItems(res.data.total)
      })
      .catch(() => toast.error('Что-то пошло не так'))
  }

  useEffect(() => {
    void loadBookings()
  }, [currentPage, itemsPerPage])

  const cols = [
    {
      key: 'user_id',
      label: 'ID клиента',
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
      key: 'date',
      label: 'Дата',
      _props: { scope: 'col' },
    },
    {
      key: 'time',
      label: 'Время',
      _props: { scope: 'col' },
    },
    {
      key: 'guests_count',
      label: 'Гости',
      _props: { scope: 'col' },
    },
    {
      key: 'estimated_cost',
      label: 'Стоимость',
      _props: { scope: 'col' },
    },
    {
      key: 'created_at',
      label: 'Заявка создана',
      _props: { scope: 'col' },
    },
  ]

  return (
    <CTabPanel itemKey={'bookings'}>
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
        tableHeadProps={{
          className: 'align-middle',
        }}
        tableProps={{
          striped: true,
          hover: true,
          className: classNames('text-center', 'align-middle'),
        }}
        scopedColumns={{
          restaurant_id: (item: Item) => <RestaurantCityCell restaurantId={item.restaurant_id} />,
          time: (item: Item) => (
            <td>
              {item.start_time}-{item.end_time}
            </td>
          ),
          created_at: (item: Item) => <td>{new Date(item.created_at).toLocaleDateString()}</td>,
        }}
      />
    </CTabPanel>
  )
}

export default BookingsPanel
