import classNames from 'classnames'
import {
  CButton,
  CCard,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTabPanel,
} from '@coreui/react-pro'
import { Dispatch, FC, SetStateAction } from 'react'
import { IConfirmation } from 'src/types/Texts.ts'
import { IRestaurantWCity } from 'src/types/Restaurant.ts'

const ReservationPanel: FC<{
  setConfirmationId: Dispatch<SetStateAction<number | null>>
  confirmationList: IConfirmation[]
  restaurants: IRestaurantWCity[]
}> = ({ setConfirmationId, confirmationList, restaurants }) => {
  const getCity = (restaurantId: number) => {
    const restaurant = restaurants.find((r) => r.id === restaurantId)
    if (restaurant?.title === 'Smoke BBQ' && restaurant?.city.name === 'Санкт-Петербург') {
      return restaurant?.address
    }
    return restaurant?.city.name
  }
  return (
    <CTabPanel itemKey="reservation">
      <CCard className={classNames('p-3', 'border-0')}>
        <CTable striped className={classNames('align-middle', 'table-hover', 'mb-0')}>
          <CTableHead>
            <CTableHeaderCell className={classNames('text-start', 'pb-3')}>
              Ресторан
            </CTableHeaderCell>
            <CTableHeaderCell className={classNames('text-center', 'pb-3')}>
              Подтверждение
            </CTableHeaderCell>
            <CTableHeaderCell className={classNames('text-end', 'pe-2', 'pb-3')}>
              Редактировать
            </CTableHeaderCell>
          </CTableHead>
          <CTableBody className={classNames('border-top')}>
            {confirmationList.map((confirmation) => (
              <CTableRow key={confirmation.id}>
                <CTableDataCell className="text-start">
                  {confirmation.title}, {getCity(confirmation.id)}
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  {confirmation.text !== null ? confirmation.text : 'Текст отсутствует'}
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
      </CCard>
    </CTabPanel>
  )
}

export default ReservationPanel
