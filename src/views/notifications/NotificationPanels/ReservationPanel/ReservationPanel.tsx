import classNames from 'classnames'
import { CCard, CTabPanel } from '@coreui/react-pro'
import { Dispatch, FC, SetStateAction } from 'react'
import { IConfirmation } from 'src/types/Texts.ts'
import { IRestaurantWCity } from 'src/types/Restaurant.ts'
import { ReservationTable } from '../../Tables/ReservationTable.tsx'

const ReservationPanel: FC<{
  setConfirmationId: Dispatch<SetStateAction<number | null>>
  confirmationList: IConfirmation[]
  restaurants: IRestaurantWCity[]
}> = ({ setConfirmationId, confirmationList, restaurants }) => {
  return (
    <CTabPanel itemKey="reservation">
      <CCard className={classNames('p-3', 'border-0')}>
        <ReservationTable
          setConfirmationId={setConfirmationId}
          confirmationList={confirmationList}
          restaurants={restaurants}
        />
      </CCard>
    </CTabPanel>
  )
}

export default ReservationPanel
