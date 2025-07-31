import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import classNames from 'classnames'

const NotificationHistory = () => {
  return (
    <CCard>
      <CCardHeader>История рассылки</CCardHeader>
      <CCardBody>
        <CTable striped className={classNames('align-middle', 'table-hover', 'mb-0')}>
          <CTableHead className="text-center">
            <CTableHeaderCell className="text-start">Текст рассылки</CTableHeaderCell>
            <CTableHeaderCell className="text-start">Показать</CTableHeaderCell>
            <CTableHeaderCell>Дата</CTableHeaderCell>
            <CTableHeaderCell>Количество получателей</CTableHeaderCell>
            <CTableHeaderCell>Удалить</CTableHeaderCell>
          </CTableHead>
          <CTableBody>
            <CTableRow className="text-center">
              <CTableDataCell className="text-start">asd</CTableDataCell>
              <CTableDataCell className="text-start">
                <CButton color="primary">Показать</CButton>
              </CTableDataCell>
              <CTableDataCell>asd</CTableDataCell>
              <CTableDataCell>asd</CTableDataCell>
              <CTableDataCell>
                <CButton color="primary">Удалить</CButton>
              </CTableDataCell>
            </CTableRow>
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  )
}

export default NotificationHistory
