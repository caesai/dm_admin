import axios from 'axios'
import { BASEURL } from 'src/api.ts'
import { IOrder, ICulinaryDish } from 'src/types/Gastronomy.ts'
import { IPagination } from 'src/types/Common.ts'

export const getOrdersList = async (props: IPagination & { restaurant_id?: number }) => {
  return await axios.get<IOrder>(`${BASEURL}/culinary/orders`, {
    params: {
      restaurant_id: props.restaurant_id,
      page: props.page,
      per_page: props.per_page,
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
