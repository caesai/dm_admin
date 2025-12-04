import {ICommon, IPagination} from 'src/types/Common.ts'
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
  total_bookings?: number

  license_agreement: boolean
  advertisement_agreement: boolean
  gdpr_agreement: boolean
  complete_onboarding: boolean
  mailing_enabled?: boolean

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
  days_since_last_booking?: number
  days_since_last_visit?: number
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
