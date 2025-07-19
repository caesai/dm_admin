import { CCard, CCardHeader, CTab, CTabContent, CTabList, CTabs } from '@coreui/react-pro'
import classNames from 'classnames'
import ReservationPanel from 'src/views/notifications/NotificationPanels/ReservationPanel.tsx'
import DistributionPanel from 'src/views/notifications/NotificationPanels/DistributionPanel.tsx'

const NotificationsPage = () => {
  return (
    <CCard className={classNames('border-0', 'bg-transparent')}>
      <CTabs defaultActiveItemKey="distribution">
        <CCardHeader className="bg-white">
          <CTabList variant="enclosed">
            <CTab itemKey="distribution">Рассылка</CTab>
            <CTab itemKey="reservation">Бронирование</CTab>
          </CTabList>
        </CCardHeader>
        <CTabContent>
          <DistributionPanel />
          <ReservationPanel />
        </CTabContent>
      </CTabs>
    </CCard>
  )
}

export default NotificationsPage
