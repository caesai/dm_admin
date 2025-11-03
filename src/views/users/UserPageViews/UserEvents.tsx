import { IEventBookingBase } from 'src/types/Event.ts'
import { CCard, CCardBody, CSmartTable } from '@coreui/react-pro'
import { Item } from '@coreui/react-pro/src/components/smart-table/types'
import { useEffect, useState } from 'react'
import { EventPopup } from 'src/views/users/UserPageViews/Modals/EventPopup.tsx'
import { useAtom } from 'jotai/index'
import { restaurantByIdAtom } from 'src/atoms/restaurantAtom.ts'

interface Props {
  events: IEventBookingBase[]
}

const RestaurantCityCell = ({ restaurantId }: { restaurantId: number }) => {
  const [restaurantState, loadRestaurant] = useAtom(restaurantByIdAtom(restaurantId))

  useEffect(() => {
    loadRestaurant()
  }, [loadRestaurant])

  return <>{restaurantState.loading ? 'Загрузка...' : restaurantState.restaurant?.city.name}</>
}

const formatDateTime = (dateString: string) => {
  if (!dateString) return '-'

  const date = new Date(dateString)
  return isNaN(date.getTime()) ? '-' : date.toLocaleString('ru-RU')
}

export const UserEvents = ({ events }: Props) => {
  const [currentEvent, setCurrentEvent] = useState<IEventBookingBase | null>(null)
  const cols = [
    {
      key: 'event_name',
      label: 'Название',
      _props: { scope: 'col' },
    },
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
      key: 'event_date',
      label: 'Дата/время',
      _props: { scope: 'col' },
    },
    {
      key: 'guests_count',
      label: 'Гости',
      _props: { scope: 'col' },
    },
    {
      key: 'payment_status',
      label: 'Статус платежа',
      _props: { scope: 'col' },
    },
    {
      key: 'payment_sum',
      label: 'Сумма',
      _props: { scope: 'col' },
    },
    {
      key: 'created_at',
      label: 'Дата создания',
      _props: { scope: 'col' },
    },
  ]

  return (
    <>
      <EventPopup event={[currentEvent, setCurrentEvent]} />
      {events.length > 0 ? (
        <CSmartTable
          columns={cols}
          items={events}
          columnFilter
          columnSorter
          clickableRows
          onRowClick={(item: Item) => setCurrentEvent(item as IEventBookingBase)}
          tableHeadProps={{
            className: 'align-middle',
          }}
          tableProps={{
            striped: true,
            hover: true,
            className: 'align-middle',
          }}
          scopedColumns={{
            restaurant_id: (item: Item) => (
              <td>
                <RestaurantCityCell restaurantId={item.restaurant_id} />
              </td>
            ),
            event_date: (item: Item) => (
              <td>
                {item.event_date} {item.time ? item.time : '-'}
              </td>
            ),
            payment_status: (item: Item) => (
              <td>{item.payment_status !== null ? item.payment_status : 'Отсутствует'}</td>
            ),
            created_at: (item: Item) => <td>{formatDateTime(item.created_at)}</td>,
          }}
        />
      ) : (
        <CCard>
          <CCardBody>У пользователя нет бронирований по мероприятиям</CCardBody>
        </CCard>
      )}
    </>
  )
}
