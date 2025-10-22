import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCardHeader,
  CCardTitle,
  CFormInput,
  CFormSelect,
  CRow,
  CSpinner,
} from '@coreui/react-pro'
import { getRestaurantCity } from 'src/utils.tsx'
import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { IRestaurantOptions, IRestaurantWCity } from 'src/types/Restaurant.ts'
import {
  GetRestaurantList,
  GetRestaurantOptions,
  SendRestaurantOptions,
} from 'src/dataProviders/restaurants.ts'
import toast from 'react-hot-toast'
import classNames from 'classnames'
import MediaInput from 'src/components/MediaInput.tsx'
import TooltipInfo from 'src/components/TooltipInfo.tsx'
import { uploadFile } from 'src/dataProviders/s3.ts'

const BanquetsPage = () => {
  const [currentId, setCurrentId] = useState<number>(0)
  const [restaurants, setRestaurants] = useState<IRestaurantWCity[]>([])
  const [currentRestaurant, setCurrentRestaurant] = useState<IRestaurantOptions | null>(null)
  const [initRestaurant, setInitRestaurant] = useState<IRestaurantOptions | null>(null)
  const [canShowImage, setShowImage] = useState<boolean>(true)
  const [loader, setLoader] = useState<boolean>(false)

  const loadRestaurants = async () => {
    const response = await GetRestaurantList()
    setRestaurants(response.data)
  }

  const changeRestaurantId = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === '') return
    setCurrentId(Number(e.target.value))
  }

  const getRestaurantData = () => {
    if (currentId === 0) return
    setLoader(true)

    GetRestaurantOptions(currentId)
      .then((res) => {
        setCurrentRestaurant(res.data)
        setInitRestaurant(res.data)
        setLoader(false)
      })
      .catch(() => toast.error('Не удалось загрузить данные о ресторане'))
  }

  const handleImageChange = (files: FileList | null) => {
    if (!files) return

    uploadFile(files[0]).then((res) => {
      setCurrentRestaurant((prev) => ({
        ...prev!,
        image: res.data.url,
      }))
      setShowImage(true)
    })
  }

  const handleImageUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    setShowImage(false)
    setCurrentRestaurant((prev) => ({
      ...prev!,
      image: e.target.value,
    }))
  }

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentRestaurant((prev) => ({
      ...prev!,
      description: e.target.value,
    }))
  }

  const isBanquetsChanged = useMemo(() => {
    if (currentRestaurant === initRestaurant) return false
    if (!currentRestaurant || !initRestaurant) return true

    return (
      currentRestaurant.image !== initRestaurant.image ||
      currentRestaurant.description !== initRestaurant.description
    )
  }, [currentRestaurant, initRestaurant])

  const sendBanquetsOptions = () => {
    if (!isBanquetsChanged) return

    SendRestaurantOptions(
      {
        description: currentRestaurant?.description ? currentRestaurant?.description : null,
        image: currentRestaurant?.image ? currentRestaurant?.image : null,
      },
      currentId,
    )
      .then(() => toast.success('Блок обновлён'))
      .catch(() => toast.error('Ошибка при сохранении'))
  }

  useEffect(() => {
    loadRestaurants()
  }, [])

  useEffect(() => {
    getRestaurantData()
  }, [currentId])

  return (
    <CCard className="border-0">
      <CCardHeader>
        <CCardTitle>Банкеты</CCardTitle>
      </CCardHeader>
      <CCardBody className={classNames('d-flex', 'flex-column', 'gap-4')}>
        <CFormSelect
          options={[
            { label: 'Выберите ресторан', value: '' },
            ...restaurants.map((restaurant) => ({
              label: `${restaurant.title}, ${getRestaurantCity(restaurants, restaurant.id)}`,
              value: `${restaurant.id}`,
            })),
          ]}
          onChange={changeRestaurantId}
        />
        {loader ? (
          <CSpinner color="primary" className="align-self-center" />
        ) : (
          currentRestaurant !== null && (
            <CCardGroup>
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
                          style={{ width: '250px', height: '250px' }}
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
                        <TooltipInfo content="Текст тултипа" />
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
                      <CButton
                        color={'primary'}
                        disabled={!isBanquetsChanged}
                        onClick={sendBanquetsOptions}
                      >
                        Сохранить
                      </CButton>
                    </CRow>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          )
        )}
      </CCardBody>
    </CCard>
  )
}

export default BanquetsPage
