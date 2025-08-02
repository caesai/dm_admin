import { CButton, CCard, CCardBody, CCardHeader, CRow, CSpinner } from '@coreui/react-pro'
import classNames from 'classnames'
import { RestaurantCard } from 'src/views/restaurants/RestaurantCard.tsx'
import { useEffect, useState } from 'react'
import { IRestaurantWCity } from 'src/types/Restaurant.ts'
import { GetRestaurantList } from 'src/dataProviders/restaurants.ts'
import { ICity } from 'src/types/City.ts'

const RestaurantsListPage = () => {
  const [restaurants, setRestaurants] = useState<IRestaurantWCity[]>([])
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    setLoader(true)
    GetRestaurantList()
      .then((res) => setRestaurants(res.data))
      .finally(() => setLoader(false))
  }, [])

  const restaurantsByCity = restaurants.reduce(
    (acc, restaurant) => {
      const cityId = restaurant.city.id

      if (!acc[cityId]) {
        acc[cityId] = {
          city: restaurant.city,
          restaurants: [],
        }
      }

      acc[cityId].restaurants.push(restaurant)
      return acc
    },
    {} as Record<number, { city: ICity; restaurants: IRestaurantWCity[] }>,
  )

  const groupedRestaurants = Object.values(restaurantsByCity)

  return (
    <CCard>
      <CCardHeader>
        <div
          className={classNames(
            'd-flex',
            'flex-row',
            'justify-content-between',
            'align-items-center',
          )}
        >
          <strong>Рестораны</strong>
          <CButton color={'success'} onClick={() => null}>
            Создать
          </CButton>
        </div>
      </CCardHeader>
      <CCardBody className={classNames('d-flex', 'flex-column', 'gap-2')}>
        {loader ? (
          <CSpinner color="primary" />
        ) : (
          groupedRestaurants.map((group, index) => (
            <CCard key={index}>
              <CCardHeader>
                <div
                  className={classNames(
                    'd-flex',
                    'flex-row',
                    'justify-content-between',
                    'align-items-center',
                  )}
                >
                  <strong>{group.city.name}</strong>
                </div>
              </CCardHeader>
              <CCardBody>
                <CRow className={classNames('gap-4')}>
                  {group.restaurants.map((res, index) => (
                    <RestaurantCard restaurant={res} key={index} />
                  ))}
                </CRow>
              </CCardBody>
            </CCard>
          ))
        )}
      </CCardBody>
    </CCard>
  )
}

export default RestaurantsListPage
