import { CCard, CCardHeader, CTab, CTabContent, CTabList, CTabs } from '@coreui/react-pro'
import { useState } from 'react'
import classNames from 'classnames'
import ReservationPanel from 'src/views/notifications/NotificationPanels/ReservationPanel.tsx'
import DistributionPanel from 'src/views/notifications/NotificationPanels/DistributionPanel.tsx'
import EditReservationPopup from 'src/views/notifications/EditReservationPopup.tsx'

const NotificationsPage = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false)
  return (
    <CCard className={classNames('border-0', 'bg-transparent')}>
      {isEdit && <EditReservationPopup popup={[isEdit, setIsEdit]} />}
      <CTabs defaultActiveItemKey="distribution">
        <CCardHeader className="bg-white">
          <CTabList variant="enclosed">
            <CTab itemKey="distribution">Рассылка</CTab>
            <CTab itemKey="reservation">Бронирование</CTab>
          </CTabList>
        </CCardHeader>
        <CTabContent>
          <DistributionPanel />
          <ReservationPanel setOpenPopup={setIsEdit} />
        </CTabContent>
      </CTabs>
    </CCard>
  )
}

export default NotificationsPage
