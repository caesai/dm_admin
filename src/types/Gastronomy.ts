import { IPagination } from 'src/types/Common.ts'

type OrderItem = {
  id: number
  title: string
  quantity: number
  price: number
}

type OrderTime = {
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
  items: OrderItem[]
  order_id: string
  pickup_date: string
  pickup_time: OrderTime
  ready_notification_sent: boolean
  reminder_sent: boolean
  restaurant_id: number
  status: string
  total_amount: number
}

export interface IOrder extends IPagination {
  orders: IOrderData[]
}

export interface ICulinaryDish {
  id: number
  guest_title: string
  title: string
  image_url: string
  weights: string[]
  weight_value: string
  prices: number[]
  allergens: string[]
  description: string
  calories?: number
  carbohydrates?: number
  fats?: number
  proteins?: number
  is_active: boolean
  priority: number
  restaurant_id: number
}
