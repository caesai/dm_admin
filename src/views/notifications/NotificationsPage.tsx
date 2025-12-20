import { CCard, CCardHeader, CTab, CTabContent, CTabList, CTabs } from '@coreui/react-pro'
import { useEffect, useState } from 'react'
import classNames from 'classnames'
import ReservationPanel from 'src/views/notifications/NotificationPanels/ReservationPanel.tsx'
import NotificationPanel from 'src/views/notifications/NotificationPanels/NotificationPanel.tsx'
import EditReservationPopup from 'src/views/notifications/NotificationPopups/EditReservationPopup.tsx'
import { getConfirmationList, getTextsList } from 'src/dataProviders/texts.ts'
import { IConfirmation, IText } from 'src/types/Texts.ts'
import OtherPanel from 'src/views/notifications/NotificationPanels/OtherPanel.tsx'
import EditOtherPopup from 'src/views/notifications/NotificationPopups/EditOtherPopup.tsx'
import { IRestaurantWCity } from 'src/types/Restaurant.ts'
import { GetRestaurantList } from 'src/dataProviders/restaurants.ts'
import MailingPanel from 'src/views/notifications/NotificationPanels/MailingPanel.tsx'

const NotificationsPage = () => {
  const [textId, setTextId] = useState<number | null>(null)
  const [confirmationId, setConfirmationId] = useState<number | null>(null)
  const [texts, setTexts] = useState<IText[]>([])
  const [restaurants, setRestaurants] = useState<IRestaurantWCity[]>([])
  const [confirmation, setConfirmation] = useState<IConfirmation[]>([])
  const loadTexts = async () => {
    const response = await getTextsList()
    setTexts([...response.data].sort((a, b) => a.id - b.id))
  }
  const loadConfirmation = async () => {
    const response = await getConfirmationList()
    setConfirmation([...response.data].sort((a, b) => a.id - b.id))
  }
  const loadRestaurants = async () => {
    const response = await GetRestaurantList()
    setRestaurants(response.data)
  }
  useEffect(() => {
    loadTexts()
    loadConfirmation()
    loadRestaurants()
  }, [])
  return (
    <CCard className={classNames('border-0', 'bg-transparent')}>
      {confirmationId !== null && (
        <EditReservationPopup
          popup={[confirmationId, setConfirmationId]}
          onUpdate={loadConfirmation}
        />
      )}
      {textId !== null && <EditOtherPopup popup={[textId, setTextId]} onUpdate={loadTexts} />}
      <CTabs defaultActiveItemKey="distribution">
        <CCardHeader>
          <CTabList variant="enclosed">
            <CTab itemKey="distribution">Рассылка</CTab>
            <CTab itemKey="mailing">Отказ от рассылки</CTab>
            <CTab itemKey="reservation">Бронирование</CTab>
            <CTab itemKey="other">Прочее</CTab>
          </CTabList>
        </CCardHeader>
        <CTabContent>
          <NotificationPanel />
          <MailingPanel />
          <ReservationPanel
            setConfirmationId={setConfirmationId}
            confirmationList={confirmation}
            restaurants={restaurants}
          />
          <OtherPanel setTextId={setTextId} texts={texts} />
        </CTabContent>
      </CTabs>
    </CCard>
  )
}

export default NotificationsPage
