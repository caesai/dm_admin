import classNames from 'classnames'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CFormInput,
  CRow,
} from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { cilArrowLeft, cilArrowRight, cilTrash } from '@coreui/icons'
import { ChangeEvent, Dispatch, FC, SetStateAction, useRef, useState } from 'react'
import { IRestaurantBanquet, IRestaurantOptions } from 'src/types/Restaurant.ts'
import { uploadFile } from 'src/dataProviders/s3.ts'
import toast from 'react-hot-toast'
import { SendBanquetsOptions } from 'src/dataProviders/banquets.ts'

const PlacementVariants: FC<{
  restaurant: [IRestaurantOptions, Dispatch<SetStateAction<IRestaurantOptions | null>>]
  setCurrentId: Dispatch<SetStateAction<number>>
  setPopup: Dispatch<SetStateAction<boolean>>
  onUpdate: () => void
}> = ({ restaurant, setCurrentId, setPopup, onUpdate }) => {
  const [changedBanquets, setChangedBanquets] = useState<{ [banquet_id: number]: boolean }>({})

  const [currentRestaurant, setCurrentRestaurant] = restaurant
  const imageRef = useRef<{ [banquet_id: number]: HTMLInputElement | null }>({})

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>, banquetId: number) => {
    setCurrentRestaurant((prev) => {
      if (!prev) return prev

      const updatedBanquetOptions = prev.banquet_options.map((banquet) => {
        if (banquet.id === banquetId) {
          return {
            ...banquet,
            name: e.target.value,
          }
        }
        return banquet
      })

      return {
        ...prev,
        banquet_options: updatedBanquetOptions,
      }
    })
    updateBanquetChangedStatus(banquetId)
  }

  const handleGuestsCountChange = (
    e: ChangeEvent<HTMLInputElement>,
    banquetId: number,
    isMinGuests: boolean,
  ) => {
    setCurrentRestaurant((prev) => {
      if (!prev) return prev

      const updatedBanquetOptions = prev.banquet_options.map((banquet) => {
        if (banquet.id === banquetId) {
          if (isMinGuests) {
            return {
              ...banquet,
              guests_min: Number(e.target.value),
            }
          } else {
            return {
              ...banquet,
              guests_max: Number(e.target.value),
            }
          }
        }
        return banquet
      })

      return {
        ...prev,
        banquet_options: updatedBanquetOptions,
      }
    })
    updateBanquetChangedStatus(banquetId)
  }

  const handleDepositChange = (e: ChangeEvent<HTMLInputElement>, banquetId: number) => {
    setCurrentRestaurant((prev) => {
      if (!prev) return prev

      const updatedBanquetOptions = prev.banquet_options.map((banquet) => {
        if (banquet.id === banquetId) {
          return {
            ...banquet,
            deposit: Number(e.target.value),
          }
        }
        return banquet
      })

      return {
        ...prev,
        banquet_options: updatedBanquetOptions,
      }
    })
    updateBanquetChangedStatus(banquetId)
  }

  const handleDepositMessageChange = (e: ChangeEvent<HTMLInputElement>, banquetId: number) => {
    setCurrentRestaurant((prev) => {
      if (!prev) return prev

      const updatedBanquetOptions = prev.banquet_options.map((banquet) => {
        if (banquet.id === banquetId) {
          return {
            ...banquet,
            deposit_message: e.target.value,
          }
        }
        return banquet
      })

      return {
        ...prev,
        banquet_options: updatedBanquetOptions,
      }
    })
    updateBanquetChangedStatus(banquetId)
  }

  const handleServiceChange = (e: ChangeEvent<HTMLInputElement>, banquetId: number) => {
    setCurrentRestaurant((prev: IRestaurantOptions | null) => {
      if (!prev) return prev

      const updatedBanquetOptions = prev.banquet_options.map((banquet) => {
        if (banquet.id === banquetId) {
          return {
            ...banquet,
            service_fee: isNaN(Number(e.target.value)) ? '' : e.target.value,
          }
        }
        return banquet
      })

      return {
        ...prev,
        banquet_options: updatedBanquetOptions,
      }
    })
    updateBanquetChangedStatus(banquetId)
  }

  const handleDurationFeeChange = (e: ChangeEvent<HTMLInputElement>, banquetId: number) => {
    setCurrentRestaurant((prev: IRestaurantOptions | null) => {
      if (!prev) return prev

      const updatedBanquetOptions = prev.banquet_options.map((banquet) => {
        if (banquet.id === banquetId) {
          const value = Number(e.target.value)
          return {
            ...banquet,
            max_duration: isNaN(value) ? 0 : value,
          }
        }
        return banquet
      })

      return {
        ...prev,
        banquet_options: updatedBanquetOptions,
      }
    })
    updateBanquetChangedStatus(banquetId)
  }

  const handleImageMove = (banquetId: number, imgIndex: number, toTop: boolean) => {
    setCurrentRestaurant((prev) => {
      if (!prev) return prev

      const updatedBanquetOptions = prev.banquet_options.map((banquet) => {
        if (banquet.id === banquetId && banquet.images && banquet.images.length > 1) {
          if (imgIndex === 0 && toTop) return banquet
          if (imgIndex === banquet.images.length - 1 && !toTop) return banquet

          const updatedImages = [...banquet.images]
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

          updateBanquetChangedStatus(banquetId)

          return {
            ...banquet,
            images: updatedImages,
          }
        }
        return banquet
      })

      return {
        ...prev,
        banquet_options: updatedBanquetOptions,
      }
    })
  }

  const handleAddImageClick = (banquetId: number) => {
    imageRef.current[banquetId]?.click()
  }

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>, banquetId: number) => {
    addNewImage(e.target.files, banquetId)
    e.target.value = ''
  }

  const addNewImage = (files: FileList | null, banquetId: number) => {
    if (!files) return

    uploadFile(files[0])
      .then((res) => {
        setCurrentRestaurant((prev) => {
          if (!prev) return prev
          const updatedBanquetOptions = prev.banquet_options.map((banquet) => {
            if (banquet.id === banquetId) {
              const currentImages = banquet.images || []
              return {
                ...banquet,
                images: [...currentImages, res.data.url],
              }
            }
            return banquet
          })
          return {
            ...prev,
            banquet_options: updatedBanquetOptions,
          }
        })
        updateBanquetChangedStatus(banquetId)
      })
      .catch(() => {
        toast.error('Что-то пошло не так')
      })
  }

  const handleImageDelete = (banquetId: number, imgIndex: number) => {
    setCurrentRestaurant((prev) => {
      if (!prev) return prev

      const updatedBanquetOptions = prev.banquet_options.map((banquet) => {
        if (banquet.id === banquetId) {
          const updatedImages = banquet.images?.filter((_img, index) => index !== imgIndex) || []

          return {
            ...banquet,
            images: updatedImages,
          }
        }
        return banquet
      })

      return {
        ...prev,
        banquet_options: updatedBanquetOptions,
      }
    })
    updateBanquetChangedStatus(banquetId)
  }

  const updateBanquetChangedStatus = (banquetId: number) => {
    if (!currentRestaurant) return
    setChangedBanquets((prev) => ({
      ...prev,
      [banquetId]: true,
    }))
  }

  const checkBanquetRequired = (options: IRestaurantBanquet) => {
    if (options.name === '') {
      toast.error('Поле Название должно быть заполнено')
      return false
    }
    if (options.guests_min === 0) {
      toast.error('Поле Минимальное количество гостей должно быть заполнено')
      return false
    }
    if (options.guests_max === 0) {
      toast.error('Поле Максимальное количество гостей должно быть заполнено')
      return false
    }
    if (options.deposit === 0 && (options.deposit_message === '' || !options.deposit_message)) {
      toast.error('Одно из полей Депозит либо Условия должно быть обязательно заполнено')
      return false
    }
    if (options.service_fee === '') {
      toast.error('Поле Обслуживание должно быть заполнено')
      return false
    }
    if (!options.images || options.images.length === 0) {
      toast.error('Должно быть добавлено минимум одно изображение')
      return false
    }

    return true
  }

  const sendBanquetOptions = (options: IRestaurantBanquet, banquet_id: number) => {
    if (!changedBanquets[banquet_id]) return
    if (!checkBanquetRequired(options)) return

    SendBanquetsOptions(options, banquet_id)
      .then(() => {
        toast.success('Блок обновлён')
        onUpdate()
      })
      .catch(() => toast.error('Ошибка при сохранении'))
  }

  return (
    <CCard className={classNames('border', 'rounded')}>
      <CCardHeader>
        <CCardTitle>Варианты рассадки</CCardTitle>
      </CCardHeader>
      <CCardBody>
        <div className={classNames('px-3', 'd-flex', 'flex-column', 'gap-3')}>
          <CRow>
            <div>
              <CButton color="primary" onClick={() => setPopup(true)}>
                Добавить вариант
              </CButton>
            </div>
          </CRow>
          {currentRestaurant.banquet_options.length > 0 ? (
            currentRestaurant.banquet_options.map((banquet) => (
              <CCard className="p-2" key={banquet.id}>
                <CCardBody className={classNames('d-flex', 'flex-column', 'gap-2')}>
                  <CRow>
                    <CFormInput
                      type="text"
                      floatingLabel="Название *"
                      placeholder={''}
                      floatingClassName={'px-0'}
                      value={banquet.name ? banquet.name : ''}
                      onChange={(event) => handleNameChange(event, banquet.id)}
                    />
                  </CRow>
                  <CRow>
                    <CFormInput
                      type="text"
                      floatingLabel="Минимальное количество гостей *"
                      placeholder={''}
                      floatingClassName={'px-0'}
                      value={banquet.guests_min ? banquet.guests_min : ''}
                      onChange={(event) => handleGuestsCountChange(event, banquet.id, true)}
                    />
                  </CRow>
                  <CRow>
                    <CFormInput
                      type="text"
                      floatingLabel="Максимальное количество гостей *"
                      placeholder={''}
                      floatingClassName={'px-0'}
                      value={banquet.guests_max ? banquet.guests_max : ''}
                      onChange={(event) => handleGuestsCountChange(event, banquet.id, false)}
                    />
                  </CRow>
                  <CRow>
                    <CFormInput
                      type="text"
                      floatingLabel="Депозит"
                      placeholder={''}
                      floatingClassName={'px-0'}
                      value={banquet.deposit ? banquet.deposit : ''}
                      onChange={(event) => handleDepositChange(event, banquet.id)}
                    />
                  </CRow>
                  <CRow>
                    <CFormInput
                      type="text"
                      floatingLabel="Условия"
                      placeholder={''}
                      floatingClassName={'px-0'}
                      value={banquet.deposit_message ? banquet.deposit_message : ''}
                      onChange={(event) => handleDepositMessageChange(event, banquet.id)}
                    />
                  </CRow>
                  <CRow>
                    <CFormInput
                      type="text"
                      floatingLabel="Обслуживание, % *"
                      placeholder={''}
                      floatingClassName={'px-0'}
                      value={
                        banquet.service_fee || banquet.service_fee === 0 ? banquet.service_fee : ''
                      }
                      onChange={(event) => handleServiceChange(event, banquet.id)}
                    />
                  </CRow>
                  <CRow>
                    <CFormInput
                      type="text"
                      floatingLabel="Максимальная длительность, ч"
                      placeholder={''}
                      floatingClassName={'px-0'}
                      value={banquet.max_duration ? banquet.max_duration : ''}
                      onChange={(event) => handleDurationFeeChange(event, banquet.id)}
                    />
                  </CRow>
                  <CRow className={classNames('d-flex', 'flex-nowrap', 'overflow-x-scroll')}>
                    {banquet.images?.map((img, index) => (
                      <div
                        key={index}
                        className={classNames(
                          'd-flex',
                          'flex-column',
                          'align-items-center',
                          'gap-2',
                        )}
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
                            onClick={() => handleImageMove(banquet.id, index, true)}
                          >
                            <CIcon icon={cilArrowLeft} />
                          </CButton>
                          <CButton
                            color="primary"
                            size="sm"
                            className={classNames('d-flex', 'align-items-center', 'gap-1')}
                            onClick={() => handleImageMove(banquet.id, index, false)}
                          >
                            <CIcon icon={cilArrowRight} />
                          </CButton>
                          <CButton
                            color="secondary"
                            size="sm"
                            className={classNames('d-flex', 'align-items-center', 'gap-1')}
                            onClick={() => handleImageDelete(banquet.id, index)}
                          >
                            <CIcon icon={cilTrash} />
                          </CButton>
                        </div>
                      </div>
                    ))}
                  </CRow>
                  <CRow className={'mt-4'}>
                    <div>
                      <input
                        type="file"
                        ref={(el) => {
                          if (el) {
                            imageRef.current[banquet.id] = el
                          }
                        }}
                        style={{ display: 'none' }}
                        onChange={(e) => handleFileInputChange(e, banquet.id)}
                        accept="image/*"
                      />
                      <CButton color="primary" onClick={() => handleAddImageClick(banquet.id)}>
                        Добавить изображение
                      </CButton>
                    </div>
                  </CRow>
                  <CRow className={'mt-4'}>
                    <div className={classNames('d-flex', 'gap-2')}>
                      <CButton
                        color="primary"
                        className={'w-100'}
                        onClick={() => sendBanquetOptions(banquet, banquet.id)}
                        disabled={!changedBanquets[banquet.id]}
                      >
                        Сохранить
                      </CButton>
                      <CButton
                        color="secondary"
                        className={'w-100'}
                        onClick={() => setCurrentId(banquet.id)}
                      >
                        Удалить
                      </CButton>
                    </div>
                  </CRow>
                </CCardBody>
              </CCard>
            ))
          ) : (
            <strong>Вариантов нет</strong>
          )}
        </div>
      </CCardBody>
    </CCard>
  )
}

export default PlacementVariants
