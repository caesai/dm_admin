import { Dispatch, FC, SetStateAction, useState } from 'react'
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
import { CreateMenuImg } from 'src/dataProviders/restaurants.ts'
import toast from 'react-hot-toast'

export const CreateMenu: FC<{
  restaurant: IRestaurant
  setRestaurant: Dispatch<SetStateAction<IRestaurant | undefined>>
  popup: [boolean, Dispatch<SetStateAction<boolean>>]
}> = ({ restaurant, setRestaurant, popup }) => {
  const [open, setOpen] = popup
  const [menu, setMenu] = useState<IMenuImg>({
    id: 0,
    image_url: '',
    order: 1,
  })

  const saveChanges = () => {
    CreateMenuImg(menu, restaurant.id)
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

  const handleImageChange = (files: FileList | null) => {
    if (!files) {
      return
    }
    uploadFile(files[0]).then((d) => setMenu((prev) => ({ ...prev, image_url: d.data.url })))
  }
  return (
    <CModal visible={open} onClose={() => setOpen(false)}>
      <CModalHeader>
        <CModalTitle>Добавить</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm className={'d-flex flex-column gap-2'}>
          <CImage src={menu.image_url} className={'w-100 h-auto bg-dark bg-opacity-50'} />
          <CInputGroup>
            <CFormInput
              floatingLabel={'Приоритет'}
              value={menu.order}
              onChange={(e) =>
                Number(e.target.value)
                  ? setMenu((prev) => ({
                      ...prev,
                      order: Number(e.target.value),
                    }))
                  : null
              }
            />

            <CButton
              color={'secondary'}
              onClick={() =>
                setMenu((prev) => ({
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
                setMenu((prev) => ({
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
          Добавить
        </CButton>
      </CModalFooter>
    </CModal>
  )
}
