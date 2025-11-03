import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CFormInput,
  CRow,
} from '@coreui/react-pro'
import classNames from 'classnames'
import MediaInput from 'src/components/MediaInput.tsx'
import TooltipInfo from 'src/components/TooltipInfo.tsx'
import { uploadFile } from 'src/dataProviders/s3.ts'
import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from 'react'
import { IRestaurantOptions } from 'src/types/Restaurant.ts'
import { SendRestaurantOptions } from 'src/dataProviders/banquets.ts'
import toast from 'react-hot-toast'

const BanquetInfo: FC<{
  restaurant: [IRestaurantOptions, Dispatch<SetStateAction<IRestaurantOptions | null>>]
  currentId: number | null
  onUpdate: () => void
}> = ({ restaurant, currentId, onUpdate }) => {
  const [currentRestaurant, setCurrentRestaurant] = restaurant
  const [canShowImage, setShowImage] = useState<boolean>(true)
  const [isChangedRestaurant, setIsChangedRestaurant] = useState<boolean>(false)

  const handleImageChange = (files: FileList | null) => {
    if (!files) return

    uploadFile(files[0])
      .then((res) => {
        setCurrentRestaurant((prev) => ({
          ...prev!,
          image: res.data.url,
        }))
        setShowImage(true)
      })
      .catch(() => {
        toast.error('Что-то пошло не так')
      })
    setIsChangedRestaurant(true)
  }

  const handleImageUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    setShowImage(false)
    setCurrentRestaurant((prev) => ({
      ...prev!,
      image: e.target.value,
    }))
    setIsChangedRestaurant(true)
  }

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentRestaurant((prev) => ({
      ...prev!,
      description: e.target.value,
    }))
    setIsChangedRestaurant(true)
  }

  const sendBanquetDetails = () => {
    if (!currentId) return

    SendRestaurantOptions(
      {
        description: currentRestaurant?.description ? currentRestaurant?.description : null,
        image: currentRestaurant?.image ? currentRestaurant?.image : null,
      },
      currentId,
    )
      .then(() => {
        toast.success('Блок обновлён')
        setIsChangedRestaurant(false)
        onUpdate()
      })
      .catch(() => toast.error('Ошибка при сохранении'))
  }

  return (
    <CCard>
      <CCardHeader>
        <CCardTitle>Блок Банкеты на странице ресторана</CCardTitle>
      </CCardHeader>
      <CCardBody>
        <div className={classNames('px-3', 'd-flex', 'flex-column', 'gap-3')}>
          <CRow>
            {currentRestaurant.image !== null && canShowImage && (
              <img
                src={currentRestaurant.image}
                alt=""
                style={{ width: 'fit-content', height: '250px' }}
              />
            )}
          </CRow>
          <CRow>
            <div className="d-flex align-items-center gap-2 p-0">
              <CFormInput
                type="text"
                placeholder="Обложка блока Банкеты"
                value={currentRestaurant.image === null ? '' : currentRestaurant.image}
                onInput={handleImageUrlChange}
              />
              <MediaInput onChange={(e) => handleImageChange(e.target.files)} />
              <TooltipInfo content="Загрузите изображение либо вставьте ссылку" />
            </div>
          </CRow>
          <CRow>
            <CFormInput
              type="text"
              floatingLabel="Описание"
              placeholder={''}
              floatingClassName={'px-0'}
              value={currentRestaurant.description ? currentRestaurant.description : ''}
              onChange={handleDescriptionChange}
            />
          </CRow>
          <CRow>
            <CButton color="primary" disabled={!isChangedRestaurant} onClick={sendBanquetDetails}>
              Сохранить
            </CButton>
          </CRow>
        </div>
      </CCardBody>
    </CCard>
  )
}

export default BanquetInfo
