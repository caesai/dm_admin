import axios from 'axios'
import { BASEURL } from 'src/api.ts'
import {
  IRestaurant,
  IRestaurantBanquet,
  IRestaurantInfo,
  IRestaurantOptions,
  IRestaurantWCity,
} from 'src/types/Restaurant.ts'
import { IPhotoCard } from 'src/types/Gallery.ts'
import { IMenu, IMenuImg } from 'src/types/Menu.ts'
import { IWorktime } from 'src/types/Worktime.ts'
import { ISocial } from 'src/types/Socials.ts'

export const GetRestaurantList = async () => {
  return await axios.get<IRestaurantWCity[]>(`${BASEURL}/restaurants/`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  })
}

export const GetRestaurant = async (id: number) => {
  return await axios.get<IRestaurant>(`${BASEURL}/restaurants/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  })
}

export const GetRestaurantOptions = async (id: number) => {
  return await axios.get<IRestaurantOptions>(`${BASEURL}/banquet-options/restaurant/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  })
}

export const UpdateRestaurantMain = async (res: IRestaurant) => {
  return await axios.patch(`${BASEURL}/restaurants/${res.id}/main`, res, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  })
}

export const UpdateRestaurantGalleryItem = async (item: IPhotoCard) => {
  return await axios.patch(`${BASEURL}/gallery/`, item, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  })
}

export const DeleteRestaurantGalleryItem = async (item: IPhotoCard) => {
  return await axios.delete(`${BASEURL}/gallery/${item.id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  })
}
export const CreateRestaurantGalleryItem = async (item: IPhotoCard, restaurant_id: number) => {
  return await axios.post(
    `${BASEURL}/gallery/`,
    {
      category: item.category,
      url: item.url,
      order: item.order,
      show_in_card: item.show_in_card,
      restaurant_id: restaurant_id,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    },
  )
}

export const UpdateRestaurantDish = async (item: IMenu) => {
  return await axios.patch(`${BASEURL}/dishes`, item, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  })
}

export const DeleteRestaurantDish = async (item: IMenu) => {
  return await axios.delete(`${BASEURL}/dishes/${item.id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  })
}

export const CreateRestaurantDish = async (item: IMenu, restaurant_id: number) => {
  return await axios.post(
    `${BASEURL}/dishes`,
    {
      title: item.title,
      price: item.price,
      photo_url: item.photo_url,
      restaurant_id: restaurant_id,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    },
  )
}

export const RemoveWorktime = async (wt: IWorktime) => {
  return await axios.delete(`${BASEURL}/workhours/${wt.id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  })
}

export const CreateWorktime = async (wt: IWorktime, restaurant_id: number) => {
  return await axios.post<IWorktime>(
    `${BASEURL}/workhours/`,
    {
      weekday: wt.weekday,
      time_start: wt.time_start,
      time_end: wt.time_end,
      restaurant_id: restaurant_id,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    },
  )
}

export const CreateMenuImg = async (menu: IMenuImg, restaurant_id: number) => {
  return await axios.post<IMenuImg>(
    `${BASEURL}/menu`,
    {
      image_url: menu.image_url,
      order: menu.order,
      restaurant_id: restaurant_id,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    },
  )
}

export const DeleteMenuImg = async (menu: IMenuImg) => {
  return await axios.delete(`${BASEURL}/menu/${menu.id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  })
}

export const CreateSocialLink = async (social: ISocial, restaurant_id: number) => {
  return await axios.post<ISocial>(
    `${BASEURL}/socials`,
    { ...social, restaurant_id },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    },
  )
}

export const DeleteSocialLink = async (social: ISocial) => {
  return await axios.delete(`${BASEURL}/socials/${social.id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  })
}

export const EditWorktime = async (worktime: IWorktime) => {
  return await axios.patch<IWorktime>(`${BASEURL}/workhours`, worktime, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  })
}

export const SendRestaurantOptions = async (data: IRestaurantInfo, restaurant_id: number) => {
  return await axios.post<IRestaurantInfo>(
    `${BASEURL}/restaurant-banquet/restaurant/${restaurant_id}`,
    { ...data, restaurant_id },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    },
  )
}

export const SendBanquetsOptions = async (data: IRestaurantBanquet, banquet_id: number) => {
  return await axios.put<IRestaurantBanquet>(
    `${BASEURL}/banquet-options/banquet-options/${banquet_id}`,
    { ...data, banquet_id },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    },
  )
}

export const DeleteBanquetsOptions = async (banquet_id: number) => {
  return await axios.delete(`${BASEURL}/banquet-options/banquet-options/${banquet_id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  })
}
