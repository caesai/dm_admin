import { useEffect, useMemo, useState } from 'react'
import { IUserFull } from 'src/types/User.ts'
import { IRestaurantWCity } from 'src/types/Restaurant.ts'
import { GetRestaurant } from 'src/dataProviders/restaurants.ts'
import toast from 'react-hot-toast'
import { IBookingWithRestaurant } from 'src/types/Booking.ts'

interface IRestaurantData extends IRestaurantWCity {
  total?: number
  visited?: number
}

interface ICityStats {
  cityName: string
  total: number
  visited: number
}

interface DayStat {
  day: string
  total: number
  visited: number
}

interface TimeStat {
  category: string
  total: number
  range: string
  visited: number
}

interface TagStat {
  tag: string
  total: number
}

export const useUserStats = (user: IUserFull) => {
  const [restaurants, setRestaurants] = useState<IRestaurantData[]>([])
  const [cityStats, setCityStats] = useState<ICityStats[]>([])
  const [timeFromLastBooking, setTimeFromLastBooking] = useState<string | null>(null)
  const [timeFromLastVisit, setTimeFromLastVisit] = useState<string | null>(null)

  const visitsIdx = useMemo(() => {
    if (!user.bookings || user.bookings.length === 0) return []
    return user.bookings
      .map((booking, index) => (booking.booking_status === 'closed' ? index : -1))
      .filter((index) => index !== -1)
  }, [user.bookings])

  const { bookingsWithKids, canceledBookings, visitedBookings } = useMemo(() => {
    let bookingsWithKids = 0
    let canceledBookings = 0
    let visitedBookings = 0

    if (user.bookings && user.bookings.length > 0) {
      user.bookings.forEach((booking) => {
        if (booking.children_count > 0) bookingsWithKids += 1
        if (booking.booking_status === 'canceled') canceledBookings += 1
        if (booking.booking_status === 'closed') visitedBookings += 1
      })
    }

    return { bookingsWithKids, canceledBookings, visitedBookings }
  }, [user.bookings])

  const tagStats = useMemo((): TagStat[] => {
    const tagStatsMap = new Map<string, number>()

    if (!user.bookings || user.bookings.length <= 0) return []

    user.bookings.forEach((booking) => {
      if (booking.tags) {
        const tagsArray = booking.tags.split(',').map((tag) => tag.trim())
        tagsArray.forEach((tag) => {
          if (tag === '') return
          tagStatsMap.set(tag, (tagStatsMap.get(tag) || 0) + 1)
        })
      }
    })

    return Array.from(tagStatsMap.entries()).map(([tag, total]) => ({ tag, total }))
  }, [user.bookings])

  const loadRestaurants = async () => {
    if (!user.bookings || user.bookings.length <= 0) {
      setRestaurants([])
      return
    }

    const restaurantsMap = new Map<number, IRestaurantData>()
    const restaurantStats = new Map<number, { total: number; visited: number }>()

    user.bookings.forEach((booking) => {
      const restaurantId = booking.restaurant_id
      const currentStats = restaurantStats.get(restaurantId) || { total: 0, visited: 0 }
      currentStats.total += 1
      if (booking.booking_status === 'closed') {
        currentStats.visited += 1
      }
      restaurantStats.set(restaurantId, currentStats)
    })

    const restaurantsData: IRestaurantData[] = []

    for (const booking of user.bookings) {
      const restaurantId = booking.restaurant?.id
      if (!restaurantId) {
        console.error('ID ресторана не найден')
        continue
      }
      if (restaurantsMap.has(restaurantId)) continue

      try {
        const res = await GetRestaurant(restaurantId)
        const restaurant = res.data
        restaurantsMap.set(restaurantId, restaurant)

        restaurantsData.push({
          ...restaurant,
          ...restaurantStats.get(restaurantId),
        })
      } catch {
        toast.error(`Ошибка загрузки ресторана ID ${restaurantId} 😔`)
      }
    }

    setRestaurants(restaurantsData)
  }

  const getCityStats = useMemo(() => {
    return (restaurantsData: IRestaurantData[]): ICityStats[] => {
      const cityStatsMap = new Map<string, { total: number; visited: number }>()

      if (!user.bookings || user.bookings.length === 0) return []

      user.bookings.forEach((booking) => {
        const restaurant = restaurantsData.find((r) => r.id === booking.restaurant_id)
        if (restaurant && restaurant.city) {
          const cityName = restaurant.city.name
          const currentStats = cityStatsMap.get(cityName) || { total: 0, visited: 0 }
          currentStats.total += 1
          if (booking.booking_status === 'closed') {
            currentStats.visited += 1
          }
          cityStatsMap.set(cityName, currentStats)
        }
      })

      return Array.from(cityStatsMap.entries()).map(([cityName, stats]) => ({
        cityName,
        total: stats.total,
        visited: stats.visited,
      }))
    }
  }, [user.bookings])

  const getDayOfWeek = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ru-RU', { weekday: 'long' })
  }

  const getTimeOfDay = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number)
    const totalMinutes = hours * 60 + minutes

    if (totalMinutes >= 7 * 60 && totalMinutes < 12 * 60) {
      return { category: 'Утро', range: '07:00-11:59' }
    } else if (totalMinutes >= 12 * 60 && totalMinutes < 18 * 60) {
      return { category: 'День', range: '12:00-17:59' }
    } else {
      return { category: 'Вечер', range: '18:00-06:59' }
    }
  }

  const { dayStats, timeStats } = useMemo(() => {
    if (!user.bookings || user.bookings.length === 0) {
      return { dayStats: [], timeStats: [] }
    }

    const dayStatsMap = new Map()
    const visitStatsMap = new Map()

    user.bookings.forEach((booking) => {
      const bookingDay = getDayOfWeek(booking.booking_date)
      dayStatsMap.set(bookingDay, (dayStatsMap.get(bookingDay) || 0) + 1)
      if (booking.booking_status === 'closed') {
        visitStatsMap.set(bookingDay, (visitStatsMap.get(bookingDay) || 0) + 1)
      }
    })

    const dayStats: DayStat[] = Array.from(dayStatsMap.entries()).map(([day, total]) => ({
      day,
      total,
      visited: visitStatsMap.get(day) || 0,
    }))

    const timeStatsMap = new Map()
    const timeVisitMap = new Map()
    const timeRangeMap = new Map()

    user.bookings.forEach((booking) => {
      const timeOfDay = getTimeOfDay(booking.time)
      const category = timeOfDay.category

      timeStatsMap.set(category, (timeStatsMap.get(category) || 0) + 1)
      timeRangeMap.set(category, timeOfDay.range)
      if (booking.booking_status === 'closed') {
        timeVisitMap.set(category, (timeVisitMap.get(category) || 0) + 1)
      }
    })

    const timeStats: TimeStat[] = Array.from(timeStatsMap.entries()).map(([category, total]) => ({
      category,
      total,
      range: timeRangeMap.get(category),
      visited: timeVisitMap.get(category) || 0,
    }))

    return { dayStats, timeStats }
  }, [user.bookings])

  const getTimeFromLastBooking = (
    bookings: IBookingWithRestaurant[] | undefined,
    timeFieldName: 'booking_date' | 'updated_at',
  ) => {
    if (!bookings || bookings.length === 0) return null

    const lastBooking = bookings.reduce(
      (latest: IBookingWithRestaurant, current: IBookingWithRestaurant) => {
        return new Date(current[timeFieldName]) > new Date(latest[timeFieldName]) ? current : latest
      },
      bookings[0],
    )
    const lastBookingDate = new Date(lastBooking[timeFieldName])

    const now = new Date()
    const diffTime = Math.abs(now.getTime() - lastBookingDate.getTime())
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 1) {
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60))
      return `${diffHours} ч. назад`
    } else {
      return `${diffDays} д. назад`
    }
  }

  useEffect(() => {
    const loadData = async () => {
      await loadRestaurants()

      const timeFromLastBooking = getTimeFromLastBooking(user.bookings, 'updated_at')
      setTimeFromLastBooking(timeFromLastBooking)

      const visits = user.bookings ? visitsIdx.map((idx) => user.bookings![idx]) : []
      const timeFromLastVisit = getTimeFromLastBooking(visits, 'booking_date')
      setTimeFromLastVisit(timeFromLastVisit)
    }

    loadData()
  }, [user.bookings])

  useEffect(() => {
    if (restaurants.length > 0) {
      const citiesStats = getCityStats(restaurants)
      setCityStats(citiesStats)
    }
  }, [restaurants, getCityStats])

  return {
    tagStats,
    bookingsWithKids,
    canceledBookings,
    visitedBookings,
    dayStats,
    timeStats,
    restaurants,
    cityStats,
    timeFromLastBooking,
    timeFromLastVisit,
  }
}
