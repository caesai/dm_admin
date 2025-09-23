import { CSmartTable } from '@coreui/react-pro'
import { IBookingWithRestaurant } from 'src/types/Booking.ts'
import { Item } from '@coreui/react-pro/src/components/smart-table/types'
import { GetRestaurant } from 'src/dataProviders/restaurants.ts'
import { useState, useEffect } from 'react'

interface Props {
  bookings: IBookingWithRestaurant[]
}

const useRestaurantCity = (restaurantId: number) => {
  const [city, setCity] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (restaurantId && !city) {
      setLoading(true)
      GetRestaurant(restaurantId)
        .then((res) => setCity(res.data.city.name))
        .catch(() => setCity('Ошибка загрузки'))
        .finally(() => setLoading(false))
    }
  }, [restaurantId, city])

  return { city, loading }
}

const RestaurantCityCell = ({ restaurantId }: { restaurantId: number }) => {
  const { city, loading } = useRestaurantCity(restaurantId)
  return <>{loading ? 'Загрузка...' : city}</>
}

const formatDateTime = (dateString: string) => {
  if (!dateString) return '-'

  const date = new Date(dateString)
  return isNaN(date.getTime()) ? '-' : date.toLocaleString('ru-RU')
}

export const UserBookings = ({ bookings }: Props) => {
  const cols = [
    {
      key: 'restaurant_name',
      label: 'Ресторан',
      _props: { scope: 'col' },
    },
    {
      key: 'restaurant_id',
      label: 'Город',
      _props: { scope: 'col' },
    },
    {
      key: 'booking_date',
      label: 'Дата',
      _props: { scope: 'col' },
    },
    {
      key: 'time',
      label: 'Время',
      _props: { scope: 'col' },
    },
    {
      key: 'duration',
      label: 'Длительность',
      _props: { scope: 'col' },
    },
    {
      key: 'booking_status',
      label: 'Статус',
      _props: { scope: 'col' },
    },
    {
      key: 'guests_count',
      label: 'Гости',
      _props: { scope: 'col' },
    },
    {
      key: 'children_count',
      label: 'Дети',
      _props: { scope: 'col' },
    },
    {
      key: 'remarked_comment',
      label: 'Комментарий в Ремаркед',
      _props: {
        scope: 'col',
        style: { width: '30%' },
      },
    },
  ]

  return (
    <CSmartTable
      columns={cols}
      items={bookings}
      columnFilter
      columnSorter
      tableHeadProps={{
        className: 'align-middle',
      }}
      tableProps={{
        striped: true,
        hover: true,
        className: 'align-middle',
      }}
      scopedColumns={{
        duration: (item: Item) => <td>{item.duration} мин</td>,
        restaurant_id: (item: Item) => (
          <td>
            <RestaurantCityCell restaurantId={item.restaurant_id} />
          </td>
        ),
        created_at: (item: Item) => <td>{formatDateTime(item.created_at)}</td>,
        updated_at: (item: Item) => <td>{formatDateTime(item.updated_at)}</td>,
      }}
    />
  )
}
