import { IUserWithDates } from 'src/types/User.ts'

export interface IMailing {
  id: number
  text: string | null
  button_text: string | null
  button_url: string | null
  sent_count: number
  total_count: number
  created_at: number
}

export interface IMailingSend {
  users_ids: Array<string>
  restaurant_id?: number
  restaurant_ids?: number[]
  text?: string
  media_url?: string
  media_type?: 'photo' | 'video' | 'document'
  media_filename?: string
  button_text?: string | null
  button_url?: string
  media_items?: Array<string[]>
}

export interface IMailingUser extends IUserWithDates {
  last_name?: string
}
