import { IUserFull, IUserPreferences } from 'src/types/User.ts'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCardImage,
  CCardTitle,
  CCol,
  CContainer,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import classNames from 'classnames'
import css from 'src/views/style/layout.module.css'
import TooltipInfo from 'src/components/TooltipInfo.tsx'
import { GetRestaurant } from 'src/dataProviders/restaurants.ts'
import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { IRestaurantWCity } from 'src/types/Restaurant.ts'

interface Props {
  user: IUserFull
  preferences: IUserPreferences
}

interface IRestaurantData extends IRestaurantWCity {
  total?: number
  visited?: number
}

interface ICityStats {
  cityName: string
  total: number
  visited: number
}

export const UserEdit = ({ user, preferences }: Props) => {
  const preferencesList = preferences.preferences
  const [restaurants, setRestaurants] = useState<IRestaurantData[]>([])
  const [cityStats, setCityStats] = useState<ICityStats[]>([])

  const loadRestaurants = async () => {
    if (user.bookings && user.bookings.length > 0) {
      const restaurantsData = await getUserRestaurants()
      setRestaurants(restaurantsData)

      const citiesStats = getCityStats(restaurantsData)
      setCityStats(citiesStats)
    }
  }

  const getBadge = (status: boolean) => {
    return status ? 'success' : 'secondary'
  }

  const getUserBookings = () => {
    let bookingsWithKids = 0
    let canceledBookings = 0
    let visitedBookings = 0
    if (user.bookings && user.bookings.length > 0) {
      user.bookings.forEach((booking) => {
        if (booking.children_count > 1) bookingsWithKids += 1
        if (booking.booking_status === 'canceled') canceledBookings += 1
        if (booking.booking_status === 'closed') visitedBookings += 1
      })
    }

    return { bookingsWithKids, canceledBookings, visitedBookings }
  }

  const getUserTags = () => {
    const tagStatsMap = new Map<string, number>()

    if (!user.bookings || user.bookings.length <= 0) return { tagStats: [] }

    user.bookings.forEach((booking) => {
      if (booking.tags) {
        const tagsArray = booking.tags.split(',').map((tag) => tag.trim())
        tagsArray.forEach((tag) => {
          if (tag === '') return
          tagStatsMap.set(tag, (tagStatsMap.get(tag) || 0) + 1)
        })
      }
    })

    const tagStats = Array.from(tagStatsMap.entries()).map(([tag, total]) => ({
      tag,
      total,
    }))

    return { tagStats }
  }

  const getUserRestaurants = async () => {
    if (!user.bookings || user.bookings.length <= 0) return []

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
      const restaurantId = booking.restaurant_id
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
        toast.error(`Ошибка загрузки ресторана`)
      }
    }

    return restaurantsData
  }

  const getCityStats = (restaurantsData: IRestaurantData[]) => {
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
      return { category: 'Вечер', range: '19:00-06:59' }
    }
  }

  const getBookingsTimeStats = () => {
    if (!user.bookings || user.bookings.length === 0) {
      return { dayStats: [], timeStats: [] }
    }

    // День недели
    const dayStatsMap = new Map()
    const visitStatsMap = new Map()

    user.bookings?.forEach((booking) => {
      const bookingDay = getDayOfWeek(booking.booking_date)
      dayStatsMap.set(bookingDay, (dayStatsMap.get(bookingDay) || 0) + 1)
      if (booking.booking_status === 'closed') {
        visitStatsMap.set(bookingDay, (visitStatsMap.get(bookingDay) || 0) + 1)
      }
    })

    const dayStats = Array.from(dayStatsMap.entries()).map(([day, total]) => ({
      day,
      total,
      visited: visitStatsMap.get(day) || 0,
    }))

    // Время суток
    const timeStatsMap = new Map()
    const timeVisitMap = new Map()
    const timeRangeMap = new Map()

    user.bookings?.forEach((booking) => {
      const timeOfDay = getTimeOfDay(booking.time)
      const category = timeOfDay.category

      timeStatsMap.set(category, (timeStatsMap.get(category) || 0) + 1)
      timeRangeMap.set(category, timeOfDay.range)
      if (booking.booking_status === 'closed') {
        timeVisitMap.set(category, (timeVisitMap.get(category) || 0) + 1)
      }
    })

    const timeStats = Array.from(timeStatsMap.entries()).map(([category, total]) => ({
      category,
      total,
      range: timeRangeMap.get(category),
      visited: timeVisitMap.get(category) || 0,
    }))

    return { dayStats, timeStats }
  }

  const getRestaurantDisplayAddress = (restaurant: IRestaurantData) => {
    if (restaurant.title === 'Self Edge Japanese') {
      return (
        <div>
          <strong>Адрес:</strong> {restaurant.city.name}
        </div>
      )
    }

    if (restaurant.title === 'Smoke BBQ') {
      return (
        <div>
          <strong>Адрес:</strong> {restaurant.address}
        </div>
      )
    }

    return null
  }

  useEffect(() => {
    loadRestaurants()
  }, [user.bookings])

  const { bookingsWithKids, canceledBookings, visitedBookings } = getUserBookings()
  const { dayStats, timeStats } = getBookingsTimeStats()
  const { tagStats } = getUserTags()

  const moodPreferences = preferencesList.find((p) => p.category === 'mood')?.choices || []
  const menuPreferences = preferencesList.find((p) => p.category === 'menu')?.choices || []
  const eventsPreferences = preferencesList.find((p) => p.category === 'events')?.choices || []

  const maxLength = Math.max(
    moodPreferences.length,
    menuPreferences.length,
    eventsPreferences.length,
  )

  return (
    <CContainer fluid>
      <CRow className="g-3 mb-4">
        <CCol md={4}>
          <CCard className="shadow-sm h-100">
            <CCardBody className="d-flex flex-column">
              <div className="text-center mb-3">
                <CCardImage orientation="top" src={user?.photo_url} />
              </div>
              <CCardTitle className="h4 mb-3 text-center">
                {user.first_name} {user.last_name || ''}
              </CCardTitle>
              <div className={classNames(css.fc8, 'flex-grow-1')}>
                <div className="mb-2">
                  <strong>Телефон:</strong> {user.phone_number}
                </div>
                <div className="mb-2">
                  <strong>Email:</strong> {user.email}
                </div>
                <div className="mb-2">
                  <strong>Регистрация:</strong> {new Date(user.created_at).toLocaleString()}
                </div>
                <div className="mb-2">
                  <strong>Последнее редактирование:</strong>{' '}
                  {new Date(user.updated_at).toLocaleString()}
                </div>
                <div className="mt-3">
                  <div className="d-grid gap-2">
                    <span className="d-flex align-items-center justify-content-between">
                      <strong>Ранний доступ:</strong>
                      <CBadge color={getBadge(user.early_access)}>
                        {user.early_access ? 'Да' : 'Нет'}
                      </CBadge>
                    </span>
                    <span className="d-flex align-items-center justify-content-between">
                      <strong>Лиц. соглашение:</strong>
                      <CBadge color={getBadge(user.license_agreement)}>
                        {user.license_agreement ? 'Да' : 'Нет'}
                      </CBadge>
                    </span>
                    <span className="d-flex align-items-center justify-content-between">
                      <strong>Обработка данных:</strong>
                      <CBadge color={getBadge(user.gdpr_agreement)}>
                        {user.gdpr_agreement ? 'Да' : 'Нет'}
                      </CBadge>
                    </span>
                    <span className="d-flex align-items-center justify-content-between">
                      <strong>Рассылки:</strong>
                      <CBadge color={getBadge(user.advertisement_agreement)}>
                        {user.advertisement_agreement ? 'Да' : 'Нет'}
                      </CBadge>
                    </span>
                  </div>
                </div>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol md={8}>
          <CRow className="g-3 h-100">
            <CCol md={12} className={classNames('d-flex', 'flex-column', 'gap-3')}>
              {!user.mailing_enabled && (
                <CCard className="h-25">
                  <CCardBody className="d-flex align-items-center justify-content-center">
                    <div className="text-center">
                      <CBadge color="" className="fs-6">
                        Пользователь заблокировал бота
                      </CBadge>
                    </div>
                  </CCardBody>
                </CCard>
              )}
              <CCard className="border h-100">
                <CCardHeader>
                  <CCardTitle className="mb-0">Предпочтения</CCardTitle>
                </CCardHeader>
                <CCardBody>
                  {preferencesList.length > 0 ? (
                    <CTable striped responsive>
                      <CTableHead>
                        <CTableRow>
                          <CTableHeaderCell>Настроение</CTableHeaderCell>
                          <CTableHeaderCell>Меню</CTableHeaderCell>
                          <CTableHeaderCell>Форматы</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {Array.from({ length: maxLength }).map((_, index) => (
                          <CTableRow key={index}>
                            <CTableDataCell>{moodPreferences[index] || '-'}</CTableDataCell>
                            <CTableDataCell>{menuPreferences[index] || '-'}</CTableDataCell>
                            <CTableDataCell>{eventsPreferences[index] || '-'}</CTableDataCell>
                          </CTableRow>
                        ))}
                      </CTableBody>
                    </CTable>
                  ) : (
                    <div className="text-center text-muted py-3">Предпочтения не указаны</div>
                  )}
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CCol>
      </CRow>
      <CRow className="g-3">
        <CCol md={4}>
          <CCard className="border h-100">
            <CCardHeader>
              <CCardTitle className="mb-0">Тэги</CCardTitle>
            </CCardHeader>
            <CCardBody className="d-grid gap-2">
              {!tagStats.length || tagStats.length === 0 ? (
                <div className="text-muted">Клиент не использовал теги</div>
              ) : (
                <div className={classNames('d-flex', 'flex-column', 'justify-content-between')}>
                  {tagStats.map((tag) => (
                    <span
                      className="d-flex align-items-center justify-content-between"
                      key={tag.tag}
                    >
                      <strong>{tag.tag}:</strong> {tag.total}
                    </span>
                  ))}
                </div>
              )}
            </CCardBody>
          </CCard>
        </CCol>
        <CCol md={4}>
          <CCard className="border h-100">
            <CCardHeader>
              <CCardTitle className="mb-0">Бронирования</CCardTitle>
            </CCardHeader>
            <CCardBody>
              {user.bookings && user.bookings.length > 0 ? (
                <div className="d-grid gap-2">
                  <span className="d-flex align-items-center justify-content-between">
                    <strong>Общее количество:</strong> {user.total_bookings}
                  </span>
                  <span className="d-flex align-items-center justify-content-between">
                    <strong>С детьми:</strong> {bookingsWithKids}
                  </span>
                  <span className="d-flex align-items-center justify-content-between">
                    <strong>Отмененных:</strong> {canceledBookings}
                  </span>
                  <span className="d-flex align-items-center justify-content-between">
                    <strong>Визитов:</strong> {visitedBookings}
                  </span>
                </div>
              ) : (
                <div
                  className={classNames(
                    'text-muted',
                    'd-flex',
                    'align-items-center',
                    'justify-content-center',
                  )}
                >
                  Бронирований нет
                </div>
              )}
            </CCardBody>
          </CCard>
        </CCol>
        {user.bookings && user.bookings.length > 0 && (
          <>
            <CCol md={4}>
              <CCard className="border h-100">
                <CCardHeader>
                  <CCardTitle className="mb-0">Города посещения/бронирования</CCardTitle>
                </CCardHeader>
                <CCardBody>
                  {cityStats.length > 0 && (
                    <div className={classNames('d-flex', 'flex-column', 'gap-2')}>
                      {cityStats.map((city, index) => (
                        <div
                          key={index}
                          className={classNames(
                            'd-flex',
                            'align-items-center',
                            'justify-content-between',
                          )}
                        >
                          <strong>{city.cityName}</strong>
                          <span className={classNames('d-flex', 'align-items-center')}>
                            {city.visited}/{city.total}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </CCardBody>
              </CCard>
            </CCol>
            <CCol md={4}>
              <CCard className="border h-100">
                <CCardHeader>
                  <CCardTitle className="mb-0">Рестораны/бронирования</CCardTitle>
                </CCardHeader>
                <CCardBody>
                  {restaurants.length > 0 && (
                    <div className={classNames('d-flex', 'flex-column', 'gap-3')}>
                      {restaurants.map((restaurant) => (
                        <div
                          key={restaurant.id}
                          className={classNames(
                            'd-flex',
                            'flex-column',
                            'p-3',
                            'border',
                            'rounded',
                          )}
                        >
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <strong className="">{restaurant.title}</strong>
                            <span className="d-flex align-items-center">
                              {restaurant.visited}/{restaurant.total}
                            </span>
                          </div>
                          <div>{getRestaurantDisplayAddress(restaurant)}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </CCardBody>
              </CCard>
            </CCol>
            <CCol md={4}>
              <CCard className="border h-100">
                <CCardHeader>
                  <CCardTitle className="mb-0">Календарь посещений</CCardTitle>
                </CCardHeader>
                <CCardBody
                  className={classNames(
                    'd-flex',
                    'flex-column',
                    'justify-content-center',
                    'text-capitalize',
                  )}
                >
                  {dayStats.map((day, index) => (
                    <div
                      className={classNames('d-flex', 'flex-column', 'gap-2', 'w-100', 'pb-2')}
                      key={index}
                    >
                      <strong>По дням недели:</strong>
                      <div className={classNames('d-flex', 'justify-content-between')}>
                        <span>{day.day}</span>
                        <span>
                          {day.visited}/{day.total}
                        </span>
                      </div>
                    </div>
                  ))}
                  <div>
                    {timeStats.map((time, index) => (
                      <div
                        className={classNames('d-flex', 'flex-column', 'gap-2', 'w-100', 'pb-2')}
                        key={index}
                      >
                        <strong>По времени суток:</strong>
                        <div className={classNames('d-flex', 'justify-content-between')}>
                          <span className={classNames('d-flex', 'gap-2')}>
                            {time.category} <TooltipInfo content={time.range} />
                          </span>
                          <span>
                            {time.visited}/{time.total}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol md={4}>
              <CCard className="border h-100">
                <CCardBody
                  className={classNames('d-flex', 'flex-column', 'justify-content-center', 'gap-2')}
                >
                  <div className={classNames('d-flex', 'flex-column', 'w-100', 'text-center')}>
                    <h6 className="text-muted mb-2">Дней с последнего бронирования:</h6>
                    <strong className="fs-5">{user.days_since_last_booking}</strong>
                  </div>
                  {user.days_since_last_visit !== 0 && (
                    <div className={classNames('d-flex', 'flex-column', 'w-100', 'text-center')}>
                      <h6 className="text-muted mb-2">Дней с последнего визита:</h6>
                      <strong className="fs-5">{user.days_since_last_visit}</strong>
                    </div>
                  )}
                </CCardBody>
              </CCard>
            </CCol>
          </>
        )}
      </CRow>
    </CContainer>
  )
}
