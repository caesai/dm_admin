import { CCard, CCardBody, CCardHeader, CCardTitle } from '@coreui/react-pro'
import classNames from 'classnames'
import { IRestaurantWCity } from 'src/types/Restaurant.ts'

interface IRestaurantData extends IRestaurantWCity {
  total?: number
  visited?: number
}

interface Props {
  restaurants: IRestaurantData[]
}

export const UserRestaurantsStats = ({ restaurants }: Props) => {
  return (
    <CCard className="border h-100">
      <CCardHeader>
        <CCardTitle className="mb-0">Рестораны/бронирования</CCardTitle>
      </CCardHeader>
      <CCardBody>
        {restaurants.length > 0 && (
          <div className={classNames('d-flex', 'flex-column', 'gap-3')}>
            {restaurants.map((restaurant) => (
              <RestaurantItem key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        )}
      </CCardBody>
    </CCard>
  )
}

const RestaurantItem = ({ restaurant }: { restaurant: IRestaurantData }) => {
  const getRestaurantDisplayAddress = (restaurant: IRestaurantData) => {
    if (restaurant.title === 'Self Edge Japanese') {
      return (
        <div>
          <strong>Адрес:</strong> {restaurant.city.name}
        </div>
      )
    }
    if (restaurant.title === 'Smoke BBQ') {
      return (
        <div>
          <strong>Адрес:</strong> {restaurant.address}
        </div>
      )
    }
    return null
  }

  return (
    <div className={classNames('d-flex', 'flex-column', 'p-3', 'border', 'rounded')}>
      <div className="d-flex justify-content-between align-items-start mb-2">
        <strong className="">{restaurant.title}</strong>
        <span className="d-flex align-items-center">
          {restaurant.visited}/{restaurant.total}
        </span>
      </div>
      <div>{getRestaurantDisplayAddress(restaurant)}</div>
    </div>
  )
}
