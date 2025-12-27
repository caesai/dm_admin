import { ICommon, IPagination } from 'src/types/Common.ts'
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
  complete_onboarding: boolean
  mailing_enabled?: boolean
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
  permissions?: string[]
}

export interface IUserList extends IPagination {
  users: IUserWithDates[]
}

export interface IUserPreference {
  category: 'mood' | 'menu' | 'events'
  choices: string[]
}

export interface IUserPreferences {
  user_id: number
  preferences: IUserPreference[]
}
