import {
  CCard,
  CCardBody,
  CCardHeader,
  CSpinner,
  CTab,
  CTabContent,
  CTabList,
  CTabPanel,
  CTabs,
} from '@coreui/react-pro'
import { useEffect, useState } from 'react'
import { IRestaurant } from 'src/types/Restaurant.ts'
import { GetRestaurant } from 'src/dataProviders/restaurants.ts'
import { useParams } from 'react-router-dom'
import { MainPanel } from 'src/views/restaurants/RestaurantPanels/MainPanel.tsx'
import { GalleryPanel } from 'src/views/restaurants/RestaurantPanels/GalleryPanel.tsx'
import { DishesPanel } from 'src/views/restaurants/RestaurantPanels/DishesPanel.tsx'
import { WorkhoursPanel } from 'src/views/restaurants/RestaurantPanels/WorkhoursPanel.tsx'
import { MenuPanel } from 'src/views/restaurants/RestaurantPanels/MenuPanel.tsx'
import { SocialsPanel } from 'src/views/restaurants/RestaurantPanels/SocialsPanel.tsx'

const RestaurantPage = () => {
  const { id } = useParams()
  const [restaurant, setRestaurant] = useState<IRestaurant>()
  const [loading, setLoading] = useState(true)
  const [updateSignal, setUpdateSignal] = useState(0)

  useEffect(() => {
    setLoading(true)
    GetRestaurant(Number(id))
      .then((res) => setRestaurant(res.data))
      .finally(() => setLoading(false))
  }, [updateSignal])

  useEffect(() => {
    console.log(`Signal: ${updateSignal}`)
  }, [updateSignal])

  if (loading) {
    return <CSpinner color={'primary'} />
  }

  if (!restaurant) {
    return <h2>Ресторан не найден</h2>
  }

  return (
    <>
      <CCard>
        <CCardHeader>
          <strong>{restaurant.title}</strong>
        </CCardHeader>
        <CCardBody>
          <CTabs activeItemKey={'main'}>
            <CTabList variant={'tabs'}>
              <CTab itemKey={'main'}>Основное</CTab>
              <CTab itemKey={'gallery'}>Галерея</CTab>
              <CTab itemKey={'dishes'}>Блюда</CTab>
              <CTab itemKey={'workhours'}>Часы работы</CTab>
              <CTab itemKey={'menu'}>Меню</CTab>
              <CTab itemKey={'socials'}>Соцсети</CTab>
            </CTabList>
            <CTabContent>
              <CTabPanel itemKey={'main'}>
                <MainPanel restaurant={restaurant} />
              </CTabPanel>
              <CTabPanel itemKey={'gallery'}>
                <GalleryPanel restaurant={restaurant} signal={[updateSignal, setUpdateSignal]} />
              </CTabPanel>
              <CTabPanel itemKey={'dishes'}>
                <DishesPanel restaurant={restaurant} signal={[updateSignal, setUpdateSignal]} />
              </CTabPanel>
              <CTabPanel itemKey={'workhours'}>
                <WorkhoursPanel
                  restaurant={restaurant}
                  setRestaurant={setRestaurant}
                  signal={[updateSignal, setUpdateSignal]}
                />
              </CTabPanel>
              <CTabPanel itemKey={'menu'}>
                <MenuPanel restaurant={restaurant} setRestaurant={setRestaurant} />
              </CTabPanel>
              <CTabPanel itemKey={'socials'}>
                <SocialsPanel restaurant={restaurant} setRestaurant={setRestaurant} />
              </CTabPanel>
            </CTabContent>
          </CTabs>
        </CCardBody>
      </CCard>
    </>
  )
}

export default RestaurantPage
