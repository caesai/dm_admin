import { Dispatch, FC, SetStateAction, useState } from 'react'
import { IRestaurant } from 'src/types/Restaurant.ts'
import {
  CButton,
  CCard,
  CCardBody,
  CCardImage,
  CCardText,
  CCardTitle,
  CRow,
} from '@coreui/react-pro'
import classNames from 'classnames'
import { DishesEditPopup } from 'src/views/restaurants/RestaurantPanels/Popups/DishesEditPopup.tsx'
import { IMenu } from 'src/types/Menu.ts'
import { DeleteRestaurantDish } from 'src/dataProviders/restaurants.ts'
import { CreateDishPopup } from 'src/views/restaurants/RestaurantPanels/Popups/CreateDishPopup.tsx'

export const DishesPanel: FC<{
  restaurant: IRestaurant
  signal: [number, Dispatch<SetStateAction<number>>]
}> = ({ restaurant, signal }) => {
  const [_, setSig] = signal
  const [editPopup, setEditPopup] = useState(false)
  const [createPopup, setCreatePopup] = useState(false)
  const [curItem, setCurItem] = useState<IMenu>()

  const deleteDish = (item: IMenu) => {
    DeleteRestaurantDish(item).then(() => setSig((p) => ++p))
  }

  return (
    <div className={'card-body'}>
      <DishesEditPopup
        signal={setSig}
        popup={[editPopup, setEditPopup]}
        dish={curItem}
      ></DishesEditPopup>
      <CreateDishPopup
        popup={[createPopup, setCreatePopup]}
        restaurant={restaurant}
        signal={setSig}
      />
      <div className={'d-flex mb-3'}>
        <CButton color={'success'} onClick={() => setCreatePopup(true)}>
          Добавить
        </CButton>
      </div>
      <CRow className={classNames('gap-4')}>
        {restaurant.menu.map((menu) => (
          <CCard key={menu.id} style={{ width: '18rem', paddingRight: 0, paddingLeft: 0 }}>
            <CCardImage
              orientation={'top'}
              src={menu.photo_url}
              className={'w-100'}
              style={{ aspectRatio: '1/1', verticalAlign: 'middle', objectFit: 'cover' }}
            />
            <CCardBody>
              <CCardTitle>{menu.title}</CCardTitle>
              <CCardText>
                <span>Цена: {menu.price} ₽</span>
                <div className={'d-flex justify-content-between pt-4'}>
                  <CButton color={'danger'} onClick={() => deleteDish(menu)}>
                    Удалить
                  </CButton>
                  <CButton
                    color={'primary'}
                    onClick={() => {
                      setCurItem(menu)
                      setEditPopup(true)
                    }}
                  >
                    Редактировать
                  </CButton>
                </div>
              </CCardText>
            </CCardBody>
          </CCard>
        ))}
      </CRow>
    </div>
  )
}
