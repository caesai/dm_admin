import { ChangeEvent, FC, useEffect, useState } from 'react'
import { CFormSelect, CSmartTable, CTabPanel } from '@coreui/react-pro'
import classNames from 'classnames'
import { Item } from '@coreui/react-pro/src/components/smart-table/types.ts'
import toast from 'react-hot-toast'
import { TablePopup } from 'src/components/TablePopup.tsx'
import { getRestaurantDishes } from 'src/dataProviders/gastronomy.ts'
import { ICulinaryDish } from 'src/types/Gastronomy.ts'
import { getRestaurantCity } from 'src/utils.tsx'
import { IRestaurantWCity } from 'src/types/Restaurant.ts'
import { GetRestaurantList } from 'src/dataProviders/restaurants.ts'

const DishesPanel: FC = () => {
  const [dishes, setDishes] = useState<ICulinaryDish[]>([])
  const [restaurants, setRestaurants] = useState<IRestaurantWCity[]>([])
  const [currentId, setCurrentId] = useState<number>(0)
  const [currentDish, setCurrentDish] = useState<ICulinaryDish | null>(null)

  const loadRestaurants = async () => {
    const response = await GetRestaurantList()
    setRestaurants(response.data)
    const blackchops = response.data.find((restaurant) => restaurant.title === 'Blackchops')
    if (blackchops) {
      setCurrentId(blackchops.id)
    }
  }

  const loadDishes = async (restaurantId: number) => {
    getRestaurantDishes(restaurantId)
      .then((res) => {
        setDishes(res.data)
      })
      .catch(() => {
        setDishes([])
        toast.error('Что-то пошло не так')
      })
  }

  const changeRestaurantId = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === '') {
      setCurrentId(0)
      setDishes([])
    } else {
      const id = Number(e.target.value)
      setCurrentId(id)
      void loadDishes(id)
    }
  }

  const getWeightVolumeQuantity = (dish: ICulinaryDish): string => {
    if (dish.weights && dish.weights.length > 0) {
      return dish.weights.join(', ')
    }
    return 'Нет'
  }

  const formatArray = (arr: number[] | string[]) => {
    if (!arr || arr.length === 0) return 'Нет'
    return arr.join(', ')
  }

  const formatValue = (value: string | number) => {
    if (value === undefined || value === null || value === '') return 'Нет'
    return String(value)
  }

  const cols = [
    {
      key: 'id',
      label: '#',
      _props: { scope: 'col' },
    },
    {
      key: 'guest_title',
      label: 'Название',
      _props: { scope: 'col' },
    },
    {
      key: 'image_url',
      label: 'Изображение',
      _props: { scope: 'col' },
    },
    {
      key: 'weight_volume_quantity',
      label: 'Вес/объем/количество',
      _props: { scope: 'col' },
    },
    {
      key: 'weight_value',
      label: 'Единица измерения',
      _props: { scope: 'col' },
    },
    {
      key: 'prices',
      label: 'Цена',
      _props: { scope: 'col' },
    },
    {
      key: 'allergens',
      label: 'Аллергены',
      _props: { scope: 'col' },
    },
    {
      key: 'description',
      label: 'Описание',
      _props: { scope: 'col' },
    },
  ]

  useEffect(() => {
    void loadRestaurants()
  }, [])

  useEffect(() => {
    if (currentId !== 0) {
      void loadDishes(currentId)
    }
  }, [currentId])

  return (
    <>
      <TablePopup data={[currentDish, setCurrentDish]} title={'Блюдо'} />
      <CTabPanel
        itemKey={'dishes'}
        className={classNames('d-flex', 'flex-column', 'gap-1', 'py-3')}
      >
        <CFormSelect
          options={[
            { label: 'Выберите ресторан', value: '' },
            ...restaurants.map((restaurant) => {
              const city = getRestaurantCity(restaurants, restaurant.id)
              const address = restaurant.address || ''
              const parts = [restaurant.title, city, address].filter(Boolean)
              return {
                label: parts.join(', '),
                value: `${restaurant.id}`,
              }
            }),
          ]}
          value={currentId !== 0 ? String(currentId) : ''}
          onChange={changeRestaurantId}
        />
        {dishes.length === 0 && currentId !== 0 ? (
          <div className="text-center py-4">В ресторане нет новогодней кулинарии.</div>
        ) : dishes.length > 0 ? (
          <CSmartTable
            columns={cols}
            items={dishes}
            clickableRows
            tableHeadProps={{
              className: 'align-middle',
            }}
            tableProps={{
              striped: true,
              hover: true,
              className: classNames('align-middle', 'text-center'),
            }}
            onRowClick={(item: Item) => setCurrentDish(item as ICulinaryDish)}
            scopedColumns={{
              id: (item: Item) => {
                const index = dishes.findIndex((dish) => dish.id === (item as ICulinaryDish).id)
                return <td>{index + 1}</td>
              },
              guest_title: (item: Item) => (
                <td>{formatValue((item as ICulinaryDish).guest_title)}</td>
              ),
              image_url: (item: Item) => {
                const dish = item as ICulinaryDish
                return (
                  <td>
                    {dish.image_url ? (
                      <img
                        src={dish.image_url}
                        alt={'Блюдо'}
                        style={{ maxWidth: '100px', maxHeight: '100px', objectFit: 'cover' }}
                      />
                    ) : (
                      'Нет'
                    )}
                  </td>
                )
              },
              weight_volume_quantity: (item: Item) => (
                <td>{getWeightVolumeQuantity(item as ICulinaryDish)}</td>
              ),
              weight_value: (item: Item) => (
                <td>{formatValue((item as ICulinaryDish).weight_value)}</td>
              ),
              prices: (item: Item) => <td>{formatArray((item as ICulinaryDish).prices)}</td>,
              allergens: (item: Item) => <td>{formatArray((item as ICulinaryDish).allergens)}</td>,
              description: (item: Item) => (
                <td>{formatValue((item as ICulinaryDish).description)}</td>
              ),
            }}
          />
        ) : null}
      </CTabPanel>
    </>
  )
}

export default DishesPanel
