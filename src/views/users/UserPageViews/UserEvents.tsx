import { IUserFull } from 'src/types/User.ts'
import {
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import { Link } from 'react-router-dom'

interface Props {
  user: IUserFull
}

export const UserEvents = ({ user }: Props) => {
  return (
    <CTable>
      <CTableHead>
        <CTableHeaderCell scope={'col'}>#</CTableHeaderCell>
        <CTableHeaderCell scope={'col'}>Мероприятие</CTableHeaderCell>
        <CTableHeaderCell scope={'col'}>Дата</CTableHeaderCell>
        <CTableHeaderCell scope={'col'}>Гостей</CTableHeaderCell>
        <CTableHeaderCell scope={'col'}>Сумма</CTableHeaderCell>
        <CTableHeaderCell scope={'col'}>Отменен</CTableHeaderCell>
        <CTableHeaderCell scope={'col'}></CTableHeaderCell>
      </CTableHead>
      <CTableBody>
        {user.events.map((event) => (
          <CTableRow key={event.id}>
            <CTableDataCell>{event.id}</CTableDataCell>
            <CTableDataCell>{event.event_title}</CTableDataCell>
            <CTableDataCell>{new Date(event.date_start).toLocaleString()}</CTableDataCell>
            <CTableDataCell>{event.guest_count}</CTableDataCell>
            <CTableDataCell>{event.total}</CTableDataCell>
            <CTableDataCell>{event.is_canceled ? 'Да' : 'Нет'}</CTableDataCell>
            <CTableDataCell>
              <Link to={`/events/${event.id}`}>
                <CButton color={'primary'}>Открыть</CButton>
              </Link>
            </CTableDataCell>
          </CTableRow>
        ))}
      </CTableBody>
    </CTable>
  )
}
