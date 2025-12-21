import axios from 'axios'
import { BASEURL } from 'src/api.ts'
import { IOrder, ICulinaryDish } from 'src/types/Gastronomy.ts'
import { IPagination } from 'src/types/Common.ts'

interface IOrderProps extends IPagination {
  restaurant_id?: number
  customer_id?: number
  created_from?: string
}

export const getOrdersList = async (props: IOrderProps) => {
  return await axios.get<IOrder>(`${BASEURL}/culinary/orders`, {
    params: {
      restaurant_id: props.restaurant_id,
      customer_id: props.customer_id,
      page: props.page,
      per_page: props.per_page,
      created_from: props.created_from,
    },
    headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
  })
}

export const getRestaurantDishes = async (restaurantId: number) => {
  return await axios.get<ICulinaryDish[]>(
    `${BASEURL}/culinary/restaurants/${restaurantId}/dishes`,
    {
      headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
    },
  )
}
