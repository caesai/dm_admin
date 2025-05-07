import { IUserFull } from 'src/types/User.ts'
import { CButton, CTable } from '@coreui/react-pro'
import { Link } from 'react-router-dom'

interface Props {
  user: IUserFull
}

export const UserBookings = ({ user }: Props) => {
  const cols = [
    {
      key: 'id',
      label: '#',
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
      key: 'guest_count',
      label: 'Гостей',
      _props: { scope: 'col' },
    },
    {
      key: 'booking_status',
      label: 'Статус',
      _props: { scope: 'col' },
    },
    {
      key: 'restaurant',
      label: 'Ресторан',
      _props: { scope: 'col' },
    },
    {
      key: 'button',
      label: '',
      _props: { scope: 'col' },
    },
  ]
  const items = user.bookings.map((book) => ({
    id: book.id,
    booking_date: book.booking_date,
    time: book.time,
    guest_count: book.guests_count,
    booking_status: book.booking_status == 'canceled' ? 'Отменен' : book.booking_status,
    button: (
      <Link to={`/bookings/${book.id}`}>
        <CButton color={'primary'}>Перейти</CButton>
      </Link>
    ),
    restaurant: book.restaurant.title,
    _props: { color: book.booking_status == 'canceled' ? 'danger' : 'primary' },
  }))
  return <CTable columns={cols} items={items}></CTable>
}
