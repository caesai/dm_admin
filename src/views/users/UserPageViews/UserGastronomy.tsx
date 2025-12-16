import { IOrderData } from 'src/types/Gastronomy.ts'
import { CCard, CCardBody, CSmartTable } from '@coreui/react-pro'
import { Item } from '@coreui/react-pro/src/components/smart-table/types'
import { useState, useEffect, FC } from 'react'
import { TablePopup } from 'src/components/TablePopup.tsx'
import { RestaurantInfoCell } from 'src/components/RestaurantInfoCell.tsx'
import { formatDateTime } from 'src/utils.tsx'
import classNames from 'classnames'
import toast from 'react-hot-toast'
import { getOrdersList } from 'src/dataProviders/gastronomy.ts'

export const UserGastronomy: FC<{
  user_id: number
}> = ({ user_id }) => {
  const [orders, setOrders] = useState<IOrderData[]>([])
  const [currentOrder, setCurrentOrder] = useState<IOrderData | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [itemsPerPage, setItemsPerPage] = useState<number>(20)
  const [totalItems, setTotalItems] = useState<number>(0)

  const loadOrders = () => {
    getOrdersList({
      customer_id: user_id,
      page: currentPage,
      per_page: itemsPerPage,
    })
      .then((res) => {
        setOrders(res.data.orders)
        setTotalItems(res.data.total!)
      })
      .catch(() => toast.error('Что-то пошло не так'))
  }

  useEffect(() => {
    void loadOrders()
  }, [user_id, currentPage, itemsPerPage])
  const cols = [
    {
      key: 'order_id',
      label: 'ID заказа',
      _props: { scope: 'col' },
    },
    {
      key: 'restaurant_id',
      label: 'Ресторан',
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
      label: 'Дата создания',
      _props: { scope: 'col' },
    },
  ]

  return (
    <>
      <TablePopup data={[currentOrder, setCurrentOrder]} title={'Заказ'} />
      {orders.length === 0 ? (
        <CCard>
          <CCardBody>У пользователя нет заказов</CCardBody>
        </CCard>
      ) : (
        <CSmartTable
          columns={cols}
          items={orders}
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
            className: classNames('text-center', 'align-middle'),
          }}
          onRowClick={(item: Item) => setCurrentOrder(item as IOrderData)}
          scopedColumns={{
            restaurant_id: (item: Item) => (
              <td>
                <RestaurantInfoCell restaurantId={item.restaurant_id} type={'title'} />
              </td>
            ),
            delivery_method: (item: Item) => (
              <td>{item.delivery_method === 'pickup' ? 'Самовывоз' : 'Доставка'}</td>
            ),
            pickup_date: (item: Item) => (
              <td>
                {item.pickup_date
                  ? new Date(item.pickup_date).toLocaleDateString()
                  : item.delivery_date
                    ? new Date(item.delivery_date).toLocaleDateString()
                    : '-'}
              </td>
            ),
            created_at: (item: Item) => <td>{formatDateTime(item.created_at)}</td>,
          }}
        />
      )}
    </>
  )
}
