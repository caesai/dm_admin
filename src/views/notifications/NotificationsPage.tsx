import { CCard, CCardHeader, CTab, CTabContent, CTabList, CTabs } from '@coreui/react-pro'
import { useEffect, useState } from 'react'
import classNames from 'classnames'
import ReservationPanel from 'src/views/notifications/NotificationPanels/ReservationPanel.tsx'
import DistributionPanel from 'src/views/notifications/NotificationPanels/DistributionPanel.tsx'
import EditReservationPopup from 'src/views/notifications/EditReservationPopup.tsx'
import { getTextsList } from 'src/dataProviders/texts.ts'
import { IText } from 'src/types/Texts.ts'

const NotificationsPage = () => {
  const [textId, setTextId] = useState<number | null>(null)
  const [texts, setTexts] = useState<IText[]>([])
  const loadTexts = async () => {
    const response = await getTextsList()
    setTexts([...response.data].sort((a, b) => a.id - b.id))
  }
  useEffect(() => {
    loadTexts()
  }, [])
  return (
    <CCard className={classNames('border-0', 'bg-transparent')}>
      {textId !== null && <EditReservationPopup popup={[textId, setTextId]} onUpdate={loadTexts} />}
      <CTabs defaultActiveItemKey="distribution">
        <CCardHeader className="bg-white">
          <CTabList variant="enclosed">
            <CTab itemKey="distribution">Рассылка</CTab>
            <CTab itemKey="reservation">Бронирование</CTab>
          </CTabList>
        </CCardHeader>
        <CTabContent>
          <DistributionPanel />
          <ReservationPanel setTextId={setTextId} texts={texts} />
        </CTabContent>
      </CTabs>
    </CCard>
  )
}

export default NotificationsPage
