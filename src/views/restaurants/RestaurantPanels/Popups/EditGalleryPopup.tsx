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
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { IPhotoCard } from 'src/types/Gallery.ts'
import { uploadFile } from 'src/dataProviders/s3.ts'
import {
  DeleteRestaurantGalleryItem,
  UpdateRestaurantGalleryItem,
} from 'src/dataProviders/restaurants.ts'

export const EditGalleryPopup: FC<{
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  card?: IPhotoCard
  signal: Dispatch<SetStateAction<number>>
}> = ({ open, setOpen, card, signal }) => {
  if (!card) {
    return <></>
  }

  const [cardCopy, setCardCopy] = useState<IPhotoCard>(card)

  useEffect(() => {
    setCardCopy(card)
  }, [card])

  const saveChanges = () => {
    UpdateRestaurantGalleryItem(cardCopy)
      .then(() => signal((p) => ++p))
      .then(() => setOpen(false))
  }
  const deleteItem = () => {
    DeleteRestaurantGalleryItem(cardCopy)
      .then(() => signal((p) => ++p))
      .then(() => setOpen(false))
  }

  const handleImageChange = (files: FileList | null) => {
    if (!files) {
      return
    }
    uploadFile(files[0]).then((d) => setCardCopy((prev) => ({ ...prev, url: d.data.url })))
  }

  return (
    <CModal visible={open} onClose={() => setOpen(false)}>
      <CModalHeader>
        <CModalTitle>Редактирование</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm className={'d-flex flex-column gap-2'}>
          <CImage
            src={cardCopy.url}
            className={'w-100 h-auto'}
            style={{ aspectRatio: '1/1', objectFit: 'cover', verticalAlign: 'middle' }}
          />
          <CFormInput
            floatingLabel={'Категория'}
            value={cardCopy.category}
            onChange={(e) => setCardCopy((prev) => ({ ...prev, category: e.target.value }))}
          />
          <CInputGroup>
            <CFormInput
              floatingLabel={'Приоритет'}
              value={cardCopy.order}
              onChange={(e) =>
                Number(e.target.value)
                  ? setCardCopy((prev) => ({
                      ...prev,
                      order: Number(e.target.value),
                    }))
                  : null
              }
            />

            <CButton
              color={'secondary'}
              onClick={() =>
                setCardCopy((prev) => ({
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
                setCardCopy((prev) => ({
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
                checked={cardCopy.show_in_card}
                onChange={(e) =>
                  setCardCopy((prev) => ({
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
      </CModalBody>
      <CModalFooter className={'d-flex justify-content-between'}>
        <CButton color={'danger'} onClick={deleteItem}>
          Удалить
        </CButton>
        <CButton color={'primary'} onClick={saveChanges}>
          Сохранить
        </CButton>
      </CModalFooter>
    </CModal>
  )
}
