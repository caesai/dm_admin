import { Dispatch, FC, SetStateAction, useState } from 'react'
import {
  CButton,
  CForm,
  CFormCheck,
  CFormInput,
  CImage,
  CInputGroup,
  CInputGroupText,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react-pro'
import { IPhotoCard } from 'src/types/Gallery.ts'
import { uploadFile } from 'src/dataProviders/s3.ts'
import { CreateRestaurantGalleryItem } from 'src/dataProviders/restaurants.ts'

export const CreateGalleryPopup: FC<{
  open: boolean
  restaurant_id: number
  setOpen: Dispatch<SetStateAction<boolean>>
  signal: Dispatch<SetStateAction<number>>
}> = ({ open, setOpen, signal, restaurant_id }) => {
  const [card, setCard] = useState<IPhotoCard>({
    id: 0,
    category: '',
    show_in_card: false,
    order: 10,
    url: '',
  })

  const handleImageChange = (files: FileList | null) => {
    if (!files) {
      return
    }
    uploadFile(files[0]).then((d) => setCard((prev) => ({ ...prev, url: d.data.url })))
  }
  const saveChanges = () => {
    CreateRestaurantGalleryItem(card, restaurant_id)
      .then(() => signal((p) => ++p))
      .then(() => setOpen(false))
  }
console.log('card.url: ', card.url);
  return (
    <CModal visible={open} onClose={() => setOpen(false)}>
      <CModalHeader>
        <CModalTitle>Добавить</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm className={'d-flex flex-column gap-2'}>
          <CImage
            src={card.url}
            className={'w-100 h-auto bg-dark bg-opacity-50'}
            style={{ aspectRatio: '1/1', objectFit: 'cover', verticalAlign: 'middle' }}
          />
          <CFormInput
            floatingLabel={'Категория'}
            value={card.category}
            onChange={(e) => setCard((prev) => ({ ...prev, category: e.target.value }))}
          />
          <CInputGroup>
            <CFormInput
              floatingLabel={'Приоритет'}
              value={card.order}
              onChange={(e) =>
                Number(e.target.value)
                  ? setCard((prev) => ({
                      ...prev,
                      order: Number(e.target.value),
                    }))
                  : null
              }
            />

            <CButton
              color={'secondary'}
              onClick={() =>
                setCard((prev) => ({
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
                setCard((prev) => ({
                  ...prev,
                  order: --prev.order,
                }))
              }
            >
              -
            </CButton>
          </CInputGroup>
          <CInputGroup>
            <CInputGroupText>
              <CFormCheck
                type={'checkbox'}
                checked={card.show_in_card}
                onChange={(e) =>
                  setCard((prev) => ({
                    ...prev,
                    show_in_card: e.target.checked,
                  }))
                }
              ></CFormCheck>
            </CInputGroupText>
            <CInputGroupText>
              <span>Отображать на главной</span>
            </CInputGroupText>
          </CInputGroup>
          <div>
            <CFormInput
              type={'file'}
              label={'Изображение'}
              onChange={(e) => handleImageChange(e.target.files)}
            ></CFormInput>
          </div>
        </CForm>
        <CModalFooter className={'d-flex justify-content-between'}>
          <CButton color={'primary'} onClick={saveChanges}>
            Сохранить
          </CButton>
        </CModalFooter>
      </CModalBody>
    </CModal>
  )
}
