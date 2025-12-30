import classNames from 'classnames'
import {
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import { Dispatch, SetStateAction } from 'react'
import { IConfirmation } from 'src/types/Texts.ts'
import { IRestaurantWCity } from 'src/types/Restaurant.ts'
import { getRestaurantCity, renderHTMLContent } from 'src/utils.tsx'

interface ReservationTableProps {
  setConfirmationId: Dispatch<SetStateAction<number | null>>
  confirmationList: IConfirmation[]
  restaurants: IRestaurantWCity[]
}

export const ReservationTable = ({
  setConfirmationId,
  confirmationList,
  restaurants,
}: ReservationTableProps) => {
  return (
    <CTable striped className={classNames('align-middle', 'table-hover', 'mb-0')}>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell className={classNames('text-start', 'pb-3')}>Ресторан</CTableHeaderCell>
          <CTableHeaderCell className={classNames('text-center', 'pb-3')}>
            Подтверждение
          </CTableHeaderCell>
          <CTableHeaderCell className={classNames('text-end', 'pe-2', 'pb-3')}>
            Редактировать
          </CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody className={classNames('border-top')}>
        {confirmationList.map((confirmation) => (
          <CTableRow key={confirmation.id}>
            <CTableDataCell className="text-start">
              {confirmation.title}, {getRestaurantCity(restaurants, confirmation.id)}
            </CTableDataCell>
            <CTableDataCell className="text-center">
              {renderHTMLContent(confirmation.text)}
            </CTableDataCell>
            <CTableDataCell className={classNames('text-end', 'pe-0')}>
              <CButton color={'primary'} onClick={() => setConfirmationId(confirmation.id)}>
                Редактировать
              </CButton>
            </CTableDataCell>
          </CTableRow>
        ))}
      </CTableBody>
    </CTable>
  )
}
