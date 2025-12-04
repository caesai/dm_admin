import classNames from 'classnames'
import { CCard, CCardBody, CCardHeader, CSmartTable } from '@coreui/react-pro'
import { Item } from '@coreui/react-pro/src/components/smart-table/types.ts'
import { IBookingWithRestaurant } from 'src/types/Booking.ts'
import { Dispatch, FC, SetStateAction } from 'react'
import { RestaurantInfoCell } from 'src/components/RestaurantInfoCell.tsx'

interface IBookingsTableProps {
  bookings: IBookingWithRestaurant[]
  perPage: [number, Dispatch<SetStateAction<number>>]
  pageProps: [number, Dispatch<SetStateAction<number>>]
  totalItems: number
  setCurrentBooking: Dispatch<SetStateAction<IBookingWithRestaurant | null>>
}

const BookingsTable: FC<IBookingsTableProps> = ({
  bookings,
  perPage,
  pageProps,
  totalItems,
  setCurrentBooking,
}) => {
  const [itemsPerPage, setItemsPerPage] = perPage
  const [currentPage, setCurrentPage] = pageProps

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
    <CCard className={classNames('rounded', 'border')}>
      <CCardHeader>
        <strong>Брони</strong>
      </CCardHeader>
      <CCardBody>
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
              restaurant_id: (item: Item) => (
                <RestaurantInfoCell restaurantId={item.restaurant_id} type={'city'} />
              ),
            }}
          />
        ) : (
          <CCard>
            <CCardBody>Бронирования не найдены, измените параметры поиска</CCardBody>
          </CCard>
        )}
      </CCardBody>
    </CCard>
  )
}

export default BookingsTable
