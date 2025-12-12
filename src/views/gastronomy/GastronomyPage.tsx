import { FC, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CTab,
  CTabContent,
  CTabList,
  CTabs,
} from '@coreui/react-pro'
import OrdersPanel from 'src/views/gastronomy/panels/OrdersPanel.tsx'
import DishesPanel from 'src/views/gastronomy/panels/DishesPanel.tsx'

const GastronomyPage: FC = () => {
  const [activeTab, setActiveTab] = useState<string | number>('orders')

  return (
    <CCard className="border-0">
      <CTabs activeItemKey={activeTab} onChange={setActiveTab}>
        <CCardHeader>
          <CTabList variant="enclosed">
            <CTab itemKey={'orders'}>Заказы</CTab>
            <CTab itemKey={'dishes'}>Блюда</CTab>
          </CTabList>
        </CCardHeader>
        <CCardBody className={'py-0'}>
          <CTabContent>
            {activeTab === 'orders' && <OrdersPanel />}
            {activeTab === 'dishes' && <DishesPanel />}
          </CTabContent>
        </CCardBody>
      </CTabs>
    </CCard>
  )
}

export default GastronomyPage
