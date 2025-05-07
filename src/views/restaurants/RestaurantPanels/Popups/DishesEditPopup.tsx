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
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { IMenu } from 'src/types/Menu.ts'
import { uploadFile } from 'src/dataProviders/s3.ts'
import { UpdateRestaurantDish } from 'src/dataProviders/restaurants.ts'

export const DishesEditPopup: FC<{
  popup: [boolean, Dispatch<SetStateAction<boolean>>]
  dish?: IMenu
  signal: Dispatch<SetStateAction<number>>
}> = ({ dish, signal, popup }) => {
  if (!dish) {
    return <></>
  }

  const [open, setOpen] = popup
  const [dishCopy, setDishCopy] = useState<IMenu>({ ...dish })
  useEffect(() => {
    setDishCopy({ ...dish })
  }, [dish])

  const handleImageChange = (files: FileList | null) => {
    if (!files) {
      return
    }
    uploadFile(files[0]).then((d) => setDishCopy((prev) => ({ ...prev, photo_url: d.data.url })))
  }

  const saveChanges = () => {
    UpdateRestaurantDish(dishCopy)
      .then(() => signal((p) => ++p))
      .then(() => setOpen(false))
  }

  return (
    <CModal visible={open} onClose={() => setOpen(false)}>
      <CModalHeader>
        <CModalTitle>Редактирование</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm className={'d-flex flex-column gap-2'}>
          <CImage
            src={dishCopy.photo_url}
            className={'w-100 h-auto'}
            style={{ aspectRatio: '1/1', objectFit: 'cover', verticalAlign: 'middle' }}
          />
          <CFormInput
            floatingLabel={'Название'}
            value={dishCopy.title}
            onChange={(e) => setDishCopy((p) => ({ ...p, title: e.target.value }))}
          />
          <CFormInput
            floatingLabel={'Цена'}
            value={dishCopy.price}
            onChange={(e) =>
              setDishCopy((p) => ({
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
        <CButton color={'primary'} onClick={() => saveChanges()}>
          Сохранить
        </CButton>
      </CModalFooter>
    </CModal>
  )
}
