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
import { CreateMenu } from 'src/views/restaurants/RestaurantPanels/Popups/CreateMenu.tsx'
import { IMenuImg } from 'src/types/Menu.ts'
import { DeleteMenuImg } from 'src/dataProviders/restaurants.ts'
import toast from 'react-hot-toast'

export const MenuPanel: FC<{
  restaurant: IRestaurant
  setRestaurant: Dispatch<SetStateAction<IRestaurant | undefined>>
}> = ({ restaurant, setRestaurant }) => {
  const [createPopup, setCreatePopup] = useState(false)

  const deleteMenu = (menu: IMenuImg) => {
    DeleteMenuImg(menu)
      .then(() =>
        setRestaurant((prev) => ({
          ...prev!,
          menu_imgs: [...prev!.menu_imgs.filter((v) => v.id !== menu.id)],
        })),
      )
      .then(() => toast.success('Запись удалена'))
  }

  return (
    <div className={'card-body'}>
      <CreateMenu
        restaurant={restaurant}
        setRestaurant={setRestaurant}
        popup={[createPopup, setCreatePopup]}
      />
      <div className={'d-flex mb-3'}>
        <CButton color={'success'} onClick={() => setCreatePopup(true)}>
          Добавить
        </CButton>
      </div>
      <CRow className={classNames('gap-4')}>
        {[...restaurant.menu_imgs]
          .sort((a, b) => a.order - b.order)
          .map((img) => (
            <CCard key={img.id} style={{ width: '18rem', paddingRight: 0, paddingLeft: 0 }}>
              <CCardImage orientation={'top'} src={img.image_url} className={'w-100'} />
              <CCardBody>
                <CCardTitle>#{img.order}</CCardTitle>
                <CCardText>
                  <div className={'d-flex justify-content-between'}>
                    <CButton color={'danger'} onClick={() => deleteMenu(img)}>
                      Удалить
                    </CButton>
                    <CButton color={'primary'}>Ред.</CButton>
                  </div>
                </CCardText>
              </CCardBody>
            </CCard>
          ))}
      </CRow>
    </div>
  )
}
