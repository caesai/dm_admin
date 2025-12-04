import { CCard, CCardBody, CSmartTable } from '@coreui/react-pro'
import { IBookingWithRestaurant } from 'src/types/Booking.ts'
import { Item } from '@coreui/react-pro/src/components/smart-table/types'
import { useState } from 'react'
import { TablePopup } from 'src/components/TablePopup.tsx'
import { RestaurantInfoCell } from 'src/components/RestaurantInfoCell.tsx'

interface Props {
  bookings: IBookingWithRestaurant[]
}

export const UserBookings = ({ bookings }: Props) => {
  const [currentBooking, setCurrentBooking] = useState<IBookingWithRestaurant | null>(null)

  const cols = [
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
      <TablePopup data={[currentBooking, setCurrentBooking]} title={'Бронирование'} />
      {bookings.length > 0 ? (
        <CSmartTable
          columns={cols}
          items={bookings}


          clickableRows
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
          <CCardBody>У пользователя нет бронирований</CCardBody>
        </CCard>
      )}
    </>
  )
}
