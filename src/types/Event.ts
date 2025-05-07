export interface IEventBookingBase {
  id: number
  event_title: string
  event_img: string
  event_description: string
  date_start: string
  guest_count: number
  name: string
  phone: string
  email: string
  commentary: string
  confirmation: string
  total: number
  remarked_id: string
  is_canceled: boolean
}
