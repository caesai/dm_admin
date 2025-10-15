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

const RESTAURANT_ADDRESS_CONFIG: Record<string, 'city' | 'full' | 'default'> = {
  'Self Edge Japanese': 'city',
  'Smoke BBQ': 'full',
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
    const addressType = RESTAURANT_ADDRESS_CONFIG[restaurant.title] || 'default'

    switch (addressType) {
      case 'city':
        return (
          <div>
            <strong>Адрес:</strong> {restaurant.city.name}
          </div>
        )
      case 'full':
        return (
          <div>
            <strong>Адрес:</strong> {restaurant.address}
          </div>
        )
      case 'default':
      default:
        return restaurant.address ? (
          <div>
            <strong>Адрес:</strong> {restaurant.address}, {restaurant.city.name}
          </div>
        ) : (
          <div>
            <strong>Адрес:</strong> {restaurant.city.name}
          </div>
        )
    }
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
