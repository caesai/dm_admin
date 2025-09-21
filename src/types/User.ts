import { ICommon } from 'src/types/Common.ts'
import { IBookingWithRestaurant, IReviewWithRestaurant } from 'src/types/Booking.ts'
import { IPaymentBase } from 'src/types/Payment.ts'
import { IEventBookingBase } from 'src/types/Event.ts'

export interface IAdministrator {
  id: number
  login: string
  user?: IUser
}

export interface IUser {
  id: number
  telegram_id: number
  first_name: string
  username?: string
  photo_url?: string
  email?: string
  phone_number?: string
  early_access: boolean

  license_agreement: boolean
  advertisement_agreement: boolean
  gdpr_agreement: boolean
  complete_onboarding: boolean

  administrator?: { id: number; is_active: boolean }
}

export interface IUserWithDates extends IUser, ICommon {}

export interface IUserFull extends IUserWithDates {
  last_name?: string
  allergies?: string
  date_of_birth?: string
  bookings?: IBookingWithRestaurant[]
  reviews?: IReviewWithRestaurant[]
  payments?: IPaymentBase[]
  events?: IEventBookingBase[]
}

export interface IUserList {
  page: number
  per_page: number
  total: number
  users: IUserWithDates[]
}
