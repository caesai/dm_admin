import { IUserFull } from 'src/types/User.ts'
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'

interface Props {
  user: IUserFull
}

export const UserPayments = ({ user }: Props) => {
  const getPaymentStatus = (status: string) => {
    switch (status) {
      case 'new':
        return 'Новый'
      case 'finished':
        return 'Завершен'
      case 'canceled':
        return 'Отменен'
      default:
        return status
    }
  }

  return (
    <CTable>
      <CTableHead>
        <CTableHeaderCell scope={'col'}>Дата</CTableHeaderCell>
        <CTableHeaderCell scope={'col'}>Статус</CTableHeaderCell>
        <CTableHeaderCell scope={'col'}>Сумма</CTableHeaderCell>
        <CTableHeaderCell scope={'col'}>ID Yookassa</CTableHeaderCell>
      </CTableHead>
      <CTableBody>
        {user.payments
          .sort((a, b) => a.id + b.id)
          .map((p) => (
            <CTableRow key={p.id}>
              <CTableDataCell>{new Date(p.created_at).toLocaleString()}</CTableDataCell>
              <CTableDataCell>{getPaymentStatus(p.status)}</CTableDataCell>
              <CTableDataCell>{p.total}</CTableDataCell>
              <CTableDataCell>{p.yookassa_id}</CTableDataCell>
            </CTableRow>
          ))}
      </CTableBody>
    </CTable>
  )
}
