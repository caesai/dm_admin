import { useAtom } from 'jotai/index'
import { restaurantByIdAtom } from 'src/atoms/restaurantAtom.ts'
import { CSSProperties, useEffect } from 'react'

type RestaurantInfoCellData = 'city' | 'address' | 'title'

type RestaurantInfoCellProps = {
  restaurantId: number
  type: RestaurantInfoCellData
  style?: CSSProperties
}

export const RestaurantInfoCell = (props: RestaurantInfoCellProps) => {
  const [restaurantState, loadRestaurant] = useAtom(restaurantByIdAtom(props.restaurantId))
  const getRestaurantInfo = () => {
    switch (props.type) {
      case 'city':
        return restaurantState.restaurant?.city?.name || '—'
      case 'address':
        return restaurantState.restaurant?.address || '—'
      case 'title':
        return restaurantState.restaurant?.title || '—'
      default:
        return '—'
    }
  }

  useEffect(() => {
    loadRestaurant()
  }, [loadRestaurant])

  if (restaurantState.loading) return <td>Загрузка...</td>
  if (!restaurantState.restaurant) return <td>Ошибка</td>

  return <td style={props.style}>{getRestaurantInfo()}</td>
}
