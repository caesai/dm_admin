import { atom, WritableAtom } from 'jotai'
import { IRestaurantWCity } from 'src/types/Restaurant.ts'
import { GetRestaurant } from 'src/dataProviders/restaurants.ts'
import toast from 'react-hot-toast'

interface RestaurantState {
  restaurant?: IRestaurantWCity
  loading: boolean
}

type RestaurantAtom = WritableAtom<RestaurantState, [void?], void>

export const restaurantsCacheAtom = atom<Map<number, IRestaurantWCity>>(new Map())
export const restaurantsLoadingAtom = atom<number[]>([])

const atomCache = new Map<number, RestaurantAtom>()

export const restaurantByIdAtom = (restaurantId: number) => {
  if (atomCache.has(restaurantId)) {
    return atomCache.get(restaurantId)!
  }

  const derivedAtom = atom<RestaurantState, [void?], void>(
    (get) => {
      const cache = get(restaurantsCacheAtom)
      const loading = get(restaurantsLoadingAtom)

      return {
        restaurant: cache.get(restaurantId),
        loading: loading.includes(restaurantId),
      }
    },
    async (get, set) => {
      if (!restaurantId) return

      const cache = get(restaurantsCacheAtom)
      const loading = get(restaurantsLoadingAtom)

      if (cache.has(restaurantId) || loading.includes(restaurantId)) {
        return
      }

      set(restaurantsLoadingAtom, (prev) => [...prev, restaurantId])

      try {
        const response = await GetRestaurant(restaurantId)
        set(restaurantsCacheAtom, (prev) => new Map(prev).set(restaurantId, response.data))
      } catch {
        toast.error('Что-то пошло не так')
      } finally {
        set(restaurantsLoadingAtom, (prev) => prev.filter((id) => id !== restaurantId))
      }
    },
  )

  atomCache.set(restaurantId, derivedAtom)
  return derivedAtom
}
