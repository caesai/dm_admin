import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { IRestaurant } from 'src/types/Restaurant.ts'
import {
  CButton,
  CForm,
  CFormInput,
  CImage,
  CInputGroup,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react-pro'
import { IMenuImg } from 'src/types/Menu.ts'
import { uploadFile } from 'src/dataProviders/s3.ts'
import { CreateMenuImg, UpdateMenuImg } from 'src/dataProviders/restaurants.ts'
import toast from 'react-hot-toast'

export const RestaurantMenu: FC<{
  restaurant: IRestaurant
  setRestaurant: Dispatch<SetStateAction<IRestaurant | undefined>>
  popup: [boolean, Dispatch<SetStateAction<boolean>>]
  menu?: IMenuImg
}> = ({ restaurant, setRestaurant, popup, menu }) => {
  const [open, setOpen] = popup
  const isEditMode = !!menu
  const [menuState, setMenuState] = useState<IMenuImg>(
    menu || {
      id: 0,
      image_url: '',
      order: 1,
    },
  )

  useEffect(() => {
    if (menu) {
      setMenuState({ ...menu })
    } else {
      setMenuState({
        id: 0,
        image_url: '',
        order: 1,
      })
    }
  }, [menu])

  const saveChanges = () => {
    if (isEditMode) {
      UpdateMenuImg(menuState)
        .then((res) =>
          setRestaurant((prev) => ({
            ...prev!,
            menu_imgs: prev!.menu_imgs.map((m) => (m.id === menuState.id ? res.data : m)),
          })),
        )
        .then(() => {
          toast.success('Запись обновлена')
          setOpen(false)
        })
    } else {
      CreateMenuImg(menuState, restaurant.id)
        .then((res) =>
          setRestaurant((prev) => ({
            ...prev!,
            menu_imgs: [...prev!.menu_imgs, res.data],
          })),
        )
        .then(() => {
          toast.success('Запись создана')
          setOpen(false)
        })
    }
  }

  const handleImageChange = (files: FileList | null) => {
    if (!files) {
      return
    }
    uploadFile(files[0]).then((d) => setMenuState((prev) => ({ ...prev, image_url: d.data.url })))
  }

  return (
    <CModal visible={open} onClose={() => setOpen(false)}>
      <CModalHeader>
        <CModalTitle>{isEditMode ? 'Редактировать' : 'Добавить'}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm className={'d-flex flex-column gap-2'}>
          <CImage src={menuState.image_url} className={'w-100 h-auto bg-dark bg-opacity-50'} />
          <CInputGroup>
            <CFormInput
              floatingLabel={'Приоритет'}
              value={menuState.order}
              onChange={(e) =>
                Number(e.target.value)
                  ? setMenuState((prev) => ({
                      ...prev,
                      order: Number(e.target.value),
                    }))
                  : null
              }
            />

            <CButton
              color={'secondary'}
              onClick={() =>
                setMenuState((prev) => ({
                  ...prev,
                  order: ++prev.order,
                }))
              }
            >
              +
            </CButton>
            <CButton
              color={'secondary'}
              onClick={() =>
                setMenuState((prev) => ({
                  ...prev,
                  order: --prev.order,
                }))
              }
            >
              -
            </CButton>
          </CInputGroup>
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
          {isEditMode ? 'Сохранить' : 'Добавить'}
        </CButton>
      </CModalFooter>
    </CModal>
  )
}
