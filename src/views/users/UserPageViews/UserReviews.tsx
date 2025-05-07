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

export const UserReviews = ({ user }: Props) => {
  return (
    <CTable>
      <CTableHead>
        <CTableHeaderCell scope={'col'}>#</CTableHeaderCell>
        <CTableHeaderCell scope={'col'}>Ресторан</CTableHeaderCell>
        <CTableHeaderCell scope={'col'}>Оценка</CTableHeaderCell>
        <CTableHeaderCell scope={'col'}>Комментарий</CTableHeaderCell>
        <CTableHeaderCell scope={'col'}></CTableHeaderCell>
      </CTableHead>
      <CTableBody>
        {user.reviews.map((review) => (
          <CTableRow key={review.id}>
            <CTableHeaderCell scope={'row'}>{review.id}</CTableHeaderCell>
            <CTableDataCell>{review.restaurant.title}</CTableDataCell>
            <CTableDataCell>{review.rate}/5</CTableDataCell>
            <CTableDataCell>{review.comment}</CTableDataCell>
            <CTableDataCell>
              <Link to={`/reviews/${review.id}`}>
                <CButton color={'primary'}>Открыть</CButton>
              </Link>
            </CTableDataCell>
          </CTableRow>
        ))}
      </CTableBody>
    </CTable>
  )
}
