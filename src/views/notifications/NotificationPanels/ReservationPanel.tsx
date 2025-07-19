import classNames from 'classnames'
import {
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTabPanel,
} from '@coreui/react-pro'

const ReservationPanel = () => {
  return (
    <CTabPanel itemKey="reservation" className={classNames('bg-white', 'p-3')}>
      <CTable striped className={classNames('align-middle', 'table-hover', 'mb-0')}>
        <CTableHead>
          <CTableHeaderCell className={classNames('text-start', 'pb-3')}>Ресторан</CTableHeaderCell>
          <CTableHeaderCell className={classNames('text-center', 'pb-3')}>
            Подтверждение
          </CTableHeaderCell>
          <CTableHeaderCell className={classNames('text-end', 'pe-2', 'pb-3')}>
            Редактировать
          </CTableHeaderCell>
        </CTableHead>
        <CTableBody className={classNames('border-top')}>
          <CTableRow>
            <CTableDataCell className="text-start">Lorem ipsum dolor sit amet.</CTableDataCell>
            <CTableDataCell className="text-center">Lorem ipsum dolor sit amet.</CTableDataCell>
            <CTableDataCell className={classNames('text-end', 'pe-0')}>
              <CButton color={'primary'} onClick={console.log}>
                Редактировать
              </CButton>
            </CTableDataCell>
          </CTableRow>
          <CTableRow>
            <CTableDataCell className="text-start">Lorem ipsum dolor sit amet.</CTableDataCell>
            <CTableDataCell className="text-center">Lorem ipsum dolor sit amet.</CTableDataCell>
            <CTableDataCell className={classNames('text-end', 'pe-0')}>
              <CButton color={'primary'} onClick={console.log}>
                Редактировать
              </CButton>
            </CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>
    </CTabPanel>
  )
}

export default ReservationPanel
