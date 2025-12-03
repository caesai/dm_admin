import { FC, useEffect, useState } from 'react'
import { CCard, CCardBody, CCardHeader, CSmartTable } from '@coreui/react-pro'
import classNames from 'classnames'
import { Item } from '@coreui/react-pro/src/components/smart-table/types.ts'
import toast from 'react-hot-toast'
import { TablePopup } from 'src/components/TablePopup.tsx'
import { getOrdersList } from 'src/dataProviders/gastronomy.ts'
import { IOrder, IOrderData } from 'src/types/Gastronomy.ts'
import { RestaurantInfoCell } from 'src/components/RestaurantInfoCell.tsx'
import { formatDateTime } from 'src/utils.tsx'

const GastronomyPage: FC = () => {
  const [ordersList, setOrdersList] = useState<IOrderData[]>([])
  const [currentOrder, setOrder] = useState<IOrder | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [itemsPerPage, setItemsPerPage] = useState<number>(20)
  const [totalItems, setTotalItems] = useState<number>(0)

  const loadOrders = async () => {
    getOrdersList({
      page: currentPage,
      per_page: itemsPerPage,
    })
      .then((res) => {
        setOrdersList(res.data.orders)
        setTotalItems(res.data.total)
      })
      .catch(() => toast.error('Что-то пошло не так'))
  }

  useEffect(() => {
    void loadOrders()
  }, [currentPage, itemsPerPage])

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
      <CCard className={classNames('rounded', 'border')}>
        <CCardHeader>
          <strong>Заказы</strong>
        </CCardHeader>
        <CCardBody className="py-0">
          <CSmartTable
            columns={cols}
            items={ordersList}
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
            onRowClick={(item: Item) => setOrder(item as IOrder)}
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
        </CCardBody>
      </CCard>
    </>
  )
}

export default GastronomyPage
