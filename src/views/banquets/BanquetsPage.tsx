import {
  CCard,
  CCardBody,
  CCardHeader,
  CTab,
  CTabContent,
  CTabList,
  CTabs,
} from '@coreui/react-pro'
import BanquetsPanel from 'src/views/banquets/panels/BanquetsPanel.tsx'
import BookingsPanel from 'src/views/banquets/panels/BookingsPanel.tsx'
import { useState } from 'react'

const BanquetsPage = () => {
  const [activeTab, setActiveTab] = useState<string | number>('banquets')

  return (
    <CCard className="border-0">
      <CTabs activeItemKey={activeTab} onChange={setActiveTab}>
        <CCardHeader>
          <CTabList variant="enclosed">
            <CTab itemKey={'banquets'}>Данные банкетов</CTab>
            <CTab itemKey={'bookings'}>Бронирования</CTab>
          </CTabList>
        </CCardHeader>
        <CCardBody>
          <CTabContent>
            {activeTab === 'banquets' && <BanquetsPanel />}
            {activeTab === 'bookings' && <BookingsPanel />}
          </CTabContent>
        </CCardBody>
      </CTabs>
    </CCard>
  )
}

export default BanquetsPage
