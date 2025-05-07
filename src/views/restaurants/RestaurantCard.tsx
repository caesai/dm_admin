import { CButton, CCard, CCardBody, CCardImage, CCardText, CCardTitle } from '@coreui/react-pro'
import classNames from 'classnames'
import { IRestaurantWCity } from 'src/types/Restaurant.ts'
import { useNavigate } from 'react-router-dom'

interface IRestaurantCard {
  restaurant: IRestaurantWCity
}

export const RestaurantCard = ({ restaurant }: IRestaurantCard) => {
  const navigate = useNavigate()

  return (
    <CCard style={{ width: '20rem' }} className={classNames('p-0')}>
      <CCardImage
        orientation={'top'}
        src={restaurant.thumbnail_photo}
        className={classNames('w100')}
      />
      <CCardBody className={classNames('p-2')}>
        <CCardTitle>{restaurant.title}</CCardTitle>
        <CCardText>
          <span className={classNames('text-dark')} style={{ fontSize: '0.9rem' }}>
            {restaurant.address}
          </span>
        </CCardText>
        <CButton color="primary" onClick={() => navigate(`/restaurants/${restaurant.id}`)}>
          Открыть
        </CButton>
      </CCardBody>
    </CCard>
  )
}
