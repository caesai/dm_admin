import axios from 'axios'
import { BASEURL } from 'src/api.ts'
import { IOrder } from 'src/types/Gastronomy.ts'

type getOrdersProps = {
  page: number
  per_page: number
}

export const getOrdersList = async (props: getOrdersProps) => {
  return await axios.get<IOrder>(`${BASEURL}/culinary/orders`, {
    params: {
      page: props.page,
      per_page: props.per_page,
    },
    headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
  })
}
