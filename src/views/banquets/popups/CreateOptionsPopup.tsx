import {
  CButton,
  CFormInput,
  CLoadingButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CSpinner,
} from '@coreui/react-pro'
import { ChangeEvent, Dispatch, FC, SetStateAction, useRef, useState } from 'react'
import classNames from 'classnames'
import { IRestaurantBanquet } from 'src/types/Restaurant.ts'
import { uploadFile } from 'src/dataProviders/s3.ts'
import CIcon from '@coreui/icons-react'
import { cilArrowLeft, cilArrowRight, cilTrash } from '@coreui/icons'
import toast from 'react-hot-toast'
import { CreateBanquetOptions } from 'src/dataProviders/banquets.ts'

const initBanquetOptions: IRestaurantBanquet = {
  id: 0,
  name: '',
  deposit: 0,
  description: null,
  deposit_message: null,
  guests_max: 0,
  guests_min: 0,
  service_fee: '',
  images: [],
}

const CreateOptionsPopup: FC<{
  popup: [boolean, Dispatch<SetStateAction<boolean>>]
  restaurant_id: number
  onCreate: () => void
}> = ({ popup, restaurant_id, onCreate }) => {
  const [visible, setVisible] = popup
  const [isCreating, setCreating] = useState(false)
  const [loadingImagesCount, setLoadingImagesCount] = useState<number>(0)
  const [banquetOptions, setBanquetOptions] = useState<IRestaurantBanquet>(initBanquetOptions)

  const imageRef = useRef<HTMLInputElement>(null)

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBanquetOptions((prev) => ({
      ...prev,
      name: e.target.value,
    }))
  }

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBanquetOptions((prev) => ({
      ...prev,
      description: e.target.value || null,
    }))
  }

  const handleGuestsCountChange = (e: ChangeEvent<HTMLInputElement>, minGuests: boolean) => {
    const value = Number(e.target.value)
    setBanquetOptions((prev) => {
      if (minGuests) {
        return {
          ...prev,
          guests_min: value,
        }
      } else {
        return {
          ...prev,
          guests_max: value,
        }
      }
    })
  }

  const handleDepositChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBanquetOptions((prev) => ({
      ...prev,
      deposit: Number(e.target.value),
    }))
  }

  const handleDepositMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBanquetOptions((prev) => ({
      ...prev,
      deposit_message: e.target.value,
    }))
  }

  const handleServiceFeeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBanquetOptions((prev) => ({
      ...prev,
      service_fee: isNaN(Number(e.target.value)) ? '' : e.target.value,
    }))
  }

  const handleDurationFeeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0
    setBanquetOptions((prev) => ({
      ...prev,
      max_duration: value,
    }))
  }

  const handleAddImageClick = () => {
    if (!imageRef.current) return
    imageRef.current.click()
  }

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    addNewImage(e.target.files)
    if (e.target) {
      e.target.value = ''
    }
  }

  const addNewImage = (files: FileList | null) => {
    if (!files || files.length === 0) return
    setLoadingImagesCount((prev) => prev + 1)

    uploadFile(files[0])
      .then((res) => {
        if (res.data?.url) {
          setBanquetOptions((prev) => ({
            ...prev,
            images: [...(prev.images || []), res.data.url],
          }))
        }
      })
      .catch(() => {
        toast.error('Что-то пошло не так')
      })
      .finally(() => setLoadingImagesCount((prev) => prev - 1))
  }

  const handleImageMove = (imgIndex: number, toTop: boolean) => {
    setBanquetOptions((prev) => {
      const currentImages = prev.images || []
      if (imgIndex === 0 && toTop) return prev
      if (imgIndex === currentImages.length - 1 && !toTop) return prev

      const updatedImages = [...currentImages]
      if (toTop) {
        ;[updatedImages[imgIndex - 1], updatedImages[imgIndex]] = [
          updatedImages[imgIndex],
          updatedImages[imgIndex - 1],
        ]
      } else {
        ;[updatedImages[imgIndex], updatedImages[imgIndex + 1]] = [
          updatedImages[imgIndex + 1],
          updatedImages[imgIndex],
        ]
      }

      return {
        ...prev,
        images: updatedImages,
      }
    })
  }

  const handleDeleteImage = (imgIndex: number) => {
    setBanquetOptions((prev) => {
      const updatedImages = (prev.images || []).filter((_img, index) => index !== imgIndex)
      return {
        ...prev,
        images: updatedImages,
      }
    })
  }

  const checkRequiredFields = () => {
    if (banquetOptions.name === '') {
      toast.error('Поле Название должно быть заполнено')
      return false
    }
    if (banquetOptions.guests_min === 0) {
      toast.error('Поле Минимальное количество гостей должно быть заполнено')
      return false
    }
    if (banquetOptions.guests_max === 0) {
      toast.error('Поле Максимальное количество гостей должно быть заполнено')
      return false
    }
    if (
      banquetOptions.deposit === 0 &&
      (banquetOptions.deposit_message === '' || !banquetOptions.deposit_message)
    ) {
      toast.error('Одно из полей Депозит либо Условия должно быть обязательно заполнено')
      return false
    }
    if (banquetOptions.service_fee === '') {
      toast.error('Поле Обслуживание должно быть заполнено')
      return false
    }
    if (!banquetOptions.images || banquetOptions.images.length === 0) {
      toast.error('Должно быть добавлено минимум одно изображение')
      return false
    }

    return true
  }

  const handleSave = async () => {
    if (!checkRequiredFields()) return
    try {
      setCreating(true)
      await CreateBanquetOptions(banquetOptions, restaurant_id)
    } finally {
      setCreating(false)
      setVisible(false)
      setBanquetOptions(initBanquetOptions)
      onCreate()
    }
  }

  const handleCancel = () => {
    setVisible(false)
    setBanquetOptions(initBanquetOptions)
  }

  return (
    <CModal size="xl" alignment="center" visible={visible} onClose={handleCancel}>
      <CModalHeader>
        <CModalTitle>Добавление варианта рассадки</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div className={classNames('d-flex', 'flex-column', 'gap-2', 'p-2')}>
          <CRow>
            <CFormInput
              type="text"
              floatingLabel="Название *"
              placeholder={''}
              floatingClassName={'px-0'}
              onChange={handleNameChange}
              value={banquetOptions.name}
            />
          </CRow>
          <CRow>
            <CFormInput
              type="text"
              floatingLabel="Описание"
              placeholder={''}
              floatingClassName={'px-0'}
              onChange={handleDescriptionChange}
              value={banquetOptions.description || ''}
            />
          </CRow>
          <CRow>
            <CFormInput
              type="text"
              floatingLabel="Минимальное количество гостей *"
              placeholder={''}
              floatingClassName={'px-0'}
              onChange={(event) => handleGuestsCountChange(event, true)}
              value={banquetOptions.guests_min || ''}
            />
          </CRow>
          <CRow>
            <CFormInput
              type="text"
              floatingLabel="Максимальное количество гостей *"
              placeholder={''}
              floatingClassName={'px-0'}
              onChange={(event) => handleGuestsCountChange(event, false)}
              value={banquetOptions.guests_max || ''}
            />
          </CRow>
          <CRow>
            <CFormInput
              type="text"
              floatingLabel="Депозит"
              placeholder={''}
              floatingClassName={'px-0'}
              onChange={handleDepositChange}
              value={banquetOptions.deposit || ''}
            />
          </CRow>
          <CRow>
            <CFormInput
              type="text"
              floatingLabel="Условия"
              placeholder={''}
              floatingClassName={'px-0'}
              onChange={handleDepositMessageChange}
              value={banquetOptions.deposit_message || ''}
            />
          </CRow>
          <CRow>
            <CFormInput
              type="text"
              floatingLabel="Обслуживание, % *"
              placeholder={''}
              floatingClassName={'px-0'}
              onChange={handleServiceFeeChange}
              value={banquetOptions.service_fee}
            />
          </CRow>
          <CRow>
            <CFormInput
              type="text"
              floatingLabel="Максимальная длительность, ч"
              placeholder={''}
              floatingClassName={'px-0'}
              onChange={handleDurationFeeChange}
              value={banquetOptions.max_duration || ''}
            />
          </CRow>
          <CRow className={classNames('d-flex', 'flex-nowrap', 'overflow-x-scroll')}>
            {(banquetOptions.images || []).map((img, index) => (
              <div
                key={index}
                className={classNames('d-flex', 'flex-column', 'align-items-center', 'gap-2')}
                style={{ width: '250px' }}
              >
                <img
                  src={img}
                  alt=""
                  className="rounded border"
                  style={{
                    width: '100%',
                    height: '250px',
                    objectFit: 'cover',
                  }}
                />
                <div className={classNames('d-flex', 'gap-1')}>
                  <CButton
                    color="primary"
                    size="sm"
                    className={classNames('d-flex', 'align-items-center', 'gap-1')}
                    onClick={() => handleImageMove(index, true)}
                  >
                    <CIcon icon={cilArrowLeft} />
                  </CButton>
                  <CButton
                    color="primary"
                    size="sm"
                    className={classNames('d-flex', 'align-items-center', 'gap-1')}
                    onClick={() => handleImageMove(index, false)}
                  >
                    <CIcon icon={cilArrowRight} />
                  </CButton>
                  <CButton
                    color="secondary"
                    size="sm"
                    className={classNames('d-flex', 'align-items-center', 'gap-1')}
                    onClick={() => handleDeleteImage(index)}
                  >
                    <CIcon icon={cilTrash} />
                  </CButton>
                </div>
              </div>
            ))}
            {Array.from({ length: loadingImagesCount }).map((_, index) => (
              <div
                key={index}
                style={{
                  width: '250px',
                  height: '250px',
                }}
                className={classNames('d-flex', 'justify-content-center', 'align-items-center')}
              >
                <CSpinner color="primary" />
              </div>
            ))}
          </CRow>
          <CRow className={'mt-4'}>
            <div style={{ marginLeft: '-12px' }}>
              <input
                type="file"
                ref={imageRef}
                style={{ display: 'none' }}
                onChange={handleFileInputChange}
                accept="image/*"
              />
              <CButton color="primary" onClick={handleAddImageClick}>
                Добавить изображение
              </CButton>
            </div>
          </CRow>
        </div>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={handleCancel}>
          Отменить
        </CButton>
        <CLoadingButton color="primary" loading={isCreating} onClick={handleSave}>
          Сохранить
        </CLoadingButton>
      </CModalFooter>
    </CModal>
  )
}

export default CreateOptionsPopup
