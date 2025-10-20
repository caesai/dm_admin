import { CCard, CCardBody, CCardHeader, CCardTitle, CFormSelect, CSpinner } from '@coreui/react-pro'
import { getRestaurantCity } from 'src/utils.tsx'
import { ChangeEvent, useEffect, useState } from 'react'
import { IRestaurantWCity } from 'src/types/Restaurant.ts'
import { GetRestaurantList, GetRestaurantOptions } from 'src/dataProviders/restaurants.ts'
import toast from 'react-hot-toast'

const BanquetsPage = () => {
  const [restaurants, setRestaurants] = useState<IRestaurantWCity[]>([])
  // const [currentRestaurant, setCurrentRestaurant] = useState<IRestaurantWCity | null>(null)
  const [loader, setLoader] = useState<boolean>(false)

  const loadRestaurants = async () => {
    const response = await GetRestaurantList()
    setRestaurants(response.data)
  }

  const getRestaurantData = (e: ChangeEvent<HTMLSelectElement>) => {
    setLoader(true)
    const restaurant_id = Number(e.target.value)

    GetRestaurantOptions(restaurant_id)
      .then((res) => {
        console.log(res.data)
        setLoader(false)
      })
      .catch(() => toast.error('Не удалось загрузить данные о ресторане'))
  }

  useEffect(() => {
    loadRestaurants()
  }, [])

  return (
    <CCard>
      <CCardHeader>
        <CCardTitle>Банкеты</CCardTitle>
      </CCardHeader>
      <CCardBody>
        <CFormSelect
          options={[
            { label: 'Выберите ресторан', value: '' },
            ...restaurants.map((restaurant) => ({
              label: `${restaurant.title}, ${getRestaurantCity(restaurants, restaurant.id)}`,
              value: `${restaurant.id}`,
            })),
          ]}
          onChange={getRestaurantData}
        />
        {loader && <CSpinner color="primary" />}
      </CCardBody>
    </CCard>
  )
}

export default BanquetsPage
