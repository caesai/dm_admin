import { ICity } from 'src/types/City.ts'
import { IPhotoCard } from 'src/types/Gallery.ts'
import { IChef } from 'src/types/Chef.ts'
import { IWorktime } from 'src/types/Worktime.ts'
import { IMenu, IMenuImg } from 'src/types/Menu.ts'
import { ISocial } from 'src/types/Socials.ts'

export interface IRestaurantShort {
  id: number
  title: string
  address: string
  address_lonlng: string
  thumbnail_photo: string
}

export interface IRestaurantWCity extends IRestaurantShort {
  city: ICity
}

export interface IRestaurant extends IRestaurantWCity {
  slogan: string
  logo_url?: string
  avg_cheque: number
  about_text: string
  about_dishes: string
  about_kitchen: string
  about_features: string
  phone_number: string

  address_station: string
  address_station_color: string
  remarked_token: string
  remarked_event_token: string

  gallery: IPhotoCard[]
  brand_chef: IChef
  worktime: IWorktime[]
  menu: IMenu[]
  menu_imgs: IMenuImg[]
  socials: ISocial[]
}

export interface IRestaurantBanquet {
  id: number
  name: string
  deposit: number
  deposit_message: string | null
  guests_max: number
  guests_min: number
  service_fee: number
  images: string | null
}

export interface IRestaurantAdditional {
  id: number
  name: string
}

export interface IRestaurantInfo {
  description: string | null
  image: string | null
}

export interface IRestaurantOptions extends IRestaurantInfo {
  additional_options: IRestaurantAdditional[]
  banquet_options: IRestaurantBanquet[]
}
