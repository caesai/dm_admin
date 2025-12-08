import { ChangeEvent, FC, useEffect, useMemo, useState } from 'react'
import { CFormSelect, CSmartTable, CTabPanel } from '@coreui/react-pro'
import classNames from 'classnames'
import { Item } from '@coreui/react-pro/src/components/smart-table/types.ts'
import toast from 'react-hot-toast'
import { TablePopup } from 'src/components/TablePopup.tsx'
import { getOrdersList } from 'src/dataProviders/gastronomy.ts'
import { IOrderData } from 'src/types/Gastronomy.ts'
import { RestaurantInfoCell } from 'src/components/RestaurantInfoCell.tsx'
import { formatDateTime, getRestaurantCity } from 'src/utils.tsx'
import { IRestaurantWCity } from 'src/types/Restaurant.ts'
import { GetRestaurantList } from 'src/dataProviders/restaurants.ts'

const OrdersPanel: FC = () => {
  const [ordersList, setOrdersList] = useState<IOrderData[]>([])
  const [allOrders, setAllOrders] = useState<IOrderData[]>([])
  const [restaurants, setRestaurants] = useState<IRestaurantWCity[]>([])
  const [currentId, setCurrentId] = useState<number>(0)
  const [currentOrder, setOrder] = useState<IOrderData | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [itemsPerPage, setItemsPerPage] = useState<number>(20)
  const [allItemsCount, setAllItemsCount] = useState<number>(0)
  const [totalItems, setTotalItems] = useState<number>(0)

  const filterDate = new Date('2025-12-08T14:00:00')

  const filterOrdersDate = (array: IOrderData[]) => {
    return array.filter((order) => {
      return new Date(order.created_at) >= filterDate
    })
  }

  const filteredOrders = useMemo(() => {
    return filterOrdersDate(ordersList)
  }, [ordersList])

  const loadOrders = async () => {
    getOrdersList({
      page: currentPage,
      per_page: itemsPerPage,
    })
      .then((res) => {
        setOrdersList(res.data.orders)
        setAllOrders(res.data.orders)
        setTotalItems(res.data.total!)
        setAllItemsCount(res.data.total!)
      })
      .catch(() => toast.error('Что-то пошло не так'))
  }

  const loadRestaurants = async () => {
    const response = await GetRestaurantList()
    setRestaurants(response.data)
  }

  const filterOrders = () => {
    if (currentId) {
      const newList = allOrders.filter((order) => order.restaurant_id === currentId)
      setOrdersList(newList)
      setTotalItems(newList.length)
    } else {
      setOrdersList(allOrders)
      setCurrentPage(1)
      setTotalItems(allItemsCount)
    }
  }

  const changeRestaurantId = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === '') setCurrentId(0)
    else {
      setCurrentId(Number(e.target.value))
    }
  }

  useEffect(() => {
    if (!currentId) {
      void loadOrders()
    }
  }, [currentPage, itemsPerPage])

  useEffect(() => {
    void loadRestaurants()
  }, [])

  useEffect(() => {
    filterOrders()
  }, [currentId])

  const cols = [
    {
      key: 'customer_name',
      label: 'Клиент',
      _props: { scope: 'col' },
    },
    {
      key: 'restaurant_id',
      label: 'Ресторан',
      _props: { scope: 'col' },
    },
    {
      key: 'restaurant_address',
      label: 'Адрес',
      _props: { scope: 'col' },
    },
    {
      key: 'status',
      label: 'Статус',
      _props: { scope: 'col' },
    },
    {
      key: 'total_amount',
      label: 'Сумма',
      _props: { scope: 'col' },
    },
    {
      key: 'delivery_method',
      label: 'Получение',
      _props: { scope: 'col' },
    },
    {
      key: 'pickup_date',
      label: 'Дата получения',
      _props: { scope: 'col' },
    },
    {
      key: 'created_at',
      label: 'Заказ создан',
      _props: { scope: 'col' },
    },
  ]

  return (
    <>
      <TablePopup data={[currentOrder, setOrder]} title={'Заказ'} />
      <CTabPanel itemKey={'orders'} className={classNames('d-flex', 'flex-column', 'py-3')}>
        <CFormSelect
          options={[
            { label: 'Выберите ресторан', value: '' },
            ...restaurants.map((restaurant) => ({
              label: `${restaurant.title}, ${getRestaurantCity(restaurants, restaurant.id)}`,
              value: `${restaurant.id}`,
            })),
          ]}
          onChange={changeRestaurantId}
        />
        <CSmartTable
          columns={cols}
          items={filteredOrders}
          clickableRows
          itemsPerPageSelect
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={setItemsPerPage}
          itemsPerPageOptions={[10, 20, 50, 100]}
          pagination
          paginationProps={{
            pages: Math.ceil(totalItems / itemsPerPage),
            activePage: currentPage,
            onActivePageChange: setCurrentPage,
          }}
          tableHeadProps={{
            className: 'align-middle',
          }}
          tableProps={{
            striped: true,
            hover: true,
            className: classNames('align-middle', 'text-center'),
          }}
          onRowClick={(item: Item) => setOrder(item as IOrderData)}
          scopedColumns={{
            restaurant_id: (item: Item) => (
              <RestaurantInfoCell restaurantId={item.restaurant_id} type={'title'} />
            ),
            restaurant_address: (item: Item) => (
              <RestaurantInfoCell restaurantId={item.restaurant_id} type={'address'} />
            ),
            delivery_method: (item: Item) => (
              <td>{item.delivery_method === 'pickup' ? 'Самовывоз' : 'Доставка'}</td>
            ),
            pickup_date: (item: Item) => (
              <td>
                {item.pickup_date
                  ? new Date(item.pickup_date).toLocaleDateString()
                  : new Date(item.delivery_date).toLocaleDateString()}
              </td>
            ),
            created_at: (item: Item) => <td>{formatDateTime(item.created_at)}</td>,
          }}
        />
      </CTabPanel>
    </>
  )
}

export default OrdersPanel
