type orderItem = {
  id: number
  title: string
  quantity: number
  price: number
}

type orderTime = {
  date: string
  time: string
}

export interface IOrderData {
  created_at: string
  customer_email: string | null
  customer_name: string
  customer_phone: string
  delivery_address: string | null
  delivery_cost: number
  delivery_date: string | null
  delivery_method: 'pickup' | 'delivery'
  delivery_time: string | null
  items: orderItem[]
  order_id: string
  pickup_date: string
  pickup_time: orderTime
  ready_notification_sent: boolean
  reminder_sent: boolean
  restaurant_id: number
  status: string
  total_amount: number
}

export interface IOrder {
  orders: IOrderData[]
  total: number
  page: number
  per_page: number
}
