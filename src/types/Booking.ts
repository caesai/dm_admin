import { IRestaurantShort } from 'src/types/Restaurant.ts'

export interface IBookingReviewBase {
  id: number
  user_id: number
  restaurant_id: number
  rate: number
  features?: string
  comment?: string
}

export interface IReviewWithRestaurant extends IBookingReviewBase {
  restaurant: IRestaurantShort
}

export interface IBookingBase {
  id: number
  remarked_id: number
  name: string
  phone: string
  email?: string
  booking_date: string
  time: string
  guests_count: number
  deposit_sum: number
  deposit_status: string
  user_comments?: string
  children_count: number
  remarked_comment: string
  booking_type: string
  duration: number
  table_ids: string
  booking_status: string
  created_at: string
  updated_at: string
  tags: string
  review?: IBookingReviewBase
}

export interface IBookingWithRestaurant extends IBookingBase {
  restaurant_id: number
  restaurant: IRestaurantShort
}
