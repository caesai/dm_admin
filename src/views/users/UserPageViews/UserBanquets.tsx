import { CCard, CCardBody, CSmartTable, CTabPanel } from '@coreui/react-pro'
import { Item } from '@coreui/react-pro/src/components/smart-table/types'
import { useState, useEffect, FC, useCallback } from 'react'
import { TablePopup } from 'src/components/TablePopup.tsx'
import { IRestaurantBanquet } from 'src/types/Restaurant.ts'
import classNames from 'classnames'
import toast from 'react-hot-toast'
import { GetUserBanquets } from 'src/dataProviders/users.ts'
import { RestaurantInfoCell } from 'src/components/RestaurantInfoCell.tsx'

export const UserBanquets: FC<{
  user_id: number
}> = ({ user_id }) => {
  const [banquets, setBanquets] = useState<IRestaurantBanquet[]>([])
  const [currentBanquet, setBanquet] = useState<IRestaurantBanquet | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [itemsPerPage, setItemsPerPage] = useState<number>(20)
  const [totalItems, setTotalItems] = useState<number>(0)

  const loadBanquets = useCallback(() => {
    GetUserBanquets(user_id, {
      page: currentPage,
      per_page: itemsPerPage,
    })
      .then((res) => {
        setBanquets(res.data.requests)
        setTotalItems(res.data.total)
      })
      .catch(() => toast.error('Что-то пошло не так'))
  }, [user_id, currentPage, itemsPerPage])

  useEffect(() => {
    void loadBanquets()
  }, [loadBanquets])

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
      key: 'date',
      label: 'Дата',
      _props: { scope: 'col' },
    },
    {
      key: 'time',
      label: 'Время',
      _props: { scope: 'col' },
    },
    {
      key: 'guests_count',
      label: 'Гости',
      _props: { scope: 'col' },
    },
    {
      key: 'estimated_cost',
      label: 'Стоимость',
      _props: { scope: 'col' },
    },
    {
      key: 'created_at',
      label: 'Заявка создана',
      _props: { scope: 'col' },
    },
  ]

  return (
    <>
      <TablePopup data={[currentBanquet, setBanquet]} title={'Банкет'} />
      {banquets.length === 0 ? (
        <CCard>
          <CCardBody>У пользователя нет бронирований по банкетам</CCardBody>
        </CCard>
      ) : (
        <CTabPanel itemKey={'banquets'}>
          <CSmartTable
            columns={cols}
            items={banquets}
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
            onRowClick={(item: Item) => setBanquet(item as IRestaurantBanquet)}
            scopedColumns={{
              restaurant_id: (item: Item) => (
                <RestaurantInfoCell restaurantId={item.restaurant_id} type={'city'} />
              ),
              time: (item: Item) => (
                <td>
                  {item.start_time}-{item.end_time}
                </td>
              ),
              created_at: (item: Item) => <td>{new Date(item.created_at).toLocaleDateString()}</td>,
            }}
          />
        </CTabPanel>
      )}
    </>
  )
}
