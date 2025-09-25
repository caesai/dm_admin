export interface IEventBookingBase {
  event_name: string
  restaurant_name: string
  restaurant_id: number
  event_date: string
  guests_count: number
  payment_status: string | null
  payment_sum: string
  created_at: string
}
