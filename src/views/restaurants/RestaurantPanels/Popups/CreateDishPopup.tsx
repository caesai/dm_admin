import { Dispatch, FC, SetStateAction, useState } from 'react'
import {
  CButton,
  CForm,
  CFormInput,
  CImage,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react-pro'
import { IRestaurant } from 'src/types/Restaurant.ts'
import { IMenu } from 'src/types/Menu.ts'
import { uploadFile } from 'src/dataProviders/s3.ts'
import { CreateRestaurantDish } from 'src/dataProviders/restaurants.ts'

export const CreateDishPopup: FC<{
  popup: [boolean, Dispatch<SetStateAction<boolean>>]
  restaurant: IRestaurant
  signal: Dispatch<SetStateAction<number>>
}> = ({ popup, restaurant, signal }) => {
  const [open, setOpen] = popup
  const [dish, setDish] = useState<IMenu>({
    id: 0,
    title: '',
    price: 1000,
    photo_url: '',
  })
  const handleImageChange = (files: FileList | null) => {
    if (!files) {
      return
    }
    uploadFile(files[0]).then((d) => setDish((prev) => ({ ...prev, photo_url: d.data.url })))
  }

  const saveChanges = () => {
    CreateRestaurantDish(dish, restaurant.id)
      .then(() => signal((p) => ++p))
      .then(() => setOpen(false))
  }

  return (
    <CModal visible={open} onClose={() => setOpen(false)}>
      <CModalHeader>
        <CModalTitle>Добавить блюдо</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm className={'d-flex flex-column gap-2'}>
          <CImage
            src={dish.photo_url}
            className={'w-100 h-auto bg-dark bg-opacity-50'}
            style={{ aspectRatio: '1/1', objectFit: 'cover', verticalAlign: 'middle' }}
          />
          <CFormInput
            floatingLabel={'Название'}
            value={dish.title}
            onChange={(e) => setDish((p) => ({ ...p, title: e.target.value }))}
          />
          <CFormInput
            floatingLabel={'Цена'}
            value={dish.price}
            onChange={(e) =>
              setDish((p) => ({
                ...p,
                price: parseInt(e.target.value) ? Number(e.target.value) : 0,
              }))
            }
          />
          <div>
            <CFormInput
              type={'file'}
              label={'Изображение'}
              onChange={(e) => handleImageChange(e.target.files)}
            ></CFormInput>
          </div>
        </CForm>
      </CModalBody>
      <CModalFooter className={'d-flex justify-content-between'}>
        <CButton color={'primary'} onClick={saveChanges}>
          Сохранить
        </CButton>
      </CModalFooter>
    </CModal>
  )
}
