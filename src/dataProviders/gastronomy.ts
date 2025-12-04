import axios from 'axios'
import { BASEURL } from 'src/api.ts'
import { IOrder } from 'src/types/Gastronomy.ts'
import {IPagination} from "src/types/Common.ts";

export const getOrdersList = async (props: IPagination) => {
  return await axios.get<IOrder>(`${BASEURL}/culinary/orders`, {
    params: {
      page: props.page,
      per_page: props.per_page,
    },
    headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` },
  })
}
