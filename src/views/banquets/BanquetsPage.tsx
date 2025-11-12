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

const BanquetsPage = () => {
  return (
    <CCard className="border-0">
      <CTabs defaultActiveItemKey={'banquets'}>
        <CCardHeader>
          <CTabList variant="enclosed">
            <CTab itemKey={'banquets'}>Данные банкетов</CTab>
            <CTab itemKey={'bookings'}>Бронирования</CTab>
          </CTabList>
        </CCardHeader>
        <CCardBody>
          <CTabContent>
            <BanquetsPanel />
            <BookingsPanel />
          </CTabContent>
        </CCardBody>
      </CTabs>
    </CCard>
  )
}

export default BanquetsPage
