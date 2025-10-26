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
import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react'
import { IRestaurantBanquet, IRestaurantOptions, IRestaurantWCity } from 'src/types/Restaurant.ts'
import {
  GetRestaurantList,
  GetRestaurantOptions,
  SendBanquetsOptions,
  SendRestaurantOptions,
} from 'src/dataProviders/restaurants.ts'
import toast from 'react-hot-toast'
import classNames from 'classnames'
import MediaInput from 'src/components/MediaInput.tsx'
import TooltipInfo from 'src/components/TooltipInfo.tsx'
import { uploadFile } from 'src/dataProviders/s3.ts'
import CIcon from '@coreui/icons-react'
import { cilArrowLeft, cilArrowRight, cilTrash } from '@coreui/icons'
import ConfirmDeletePopup from 'src/views/banquets/popups/ConfirmDeletePopup.tsx'
import CreateOptionsPopup from 'src/views/banquets/popups/CreateOptionsPopup.tsx'

const BanquetsPage = () => {
  const [currentId, setCurrentId] = useState<number>(0)
  const [restaurants, setRestaurants] = useState<IRestaurantWCity[]>([])
  const [currentRestaurant, setCurrentRestaurant] = useState<IRestaurantOptions | null>(null)
  const [initRestaurant, setInitRestaurant] = useState<IRestaurantOptions | null>(null)
  const [canShowImage, setShowImage] = useState<boolean>(true)
  const [currentBanquetId, setCurrentBanquetId] = useState<number | null>(null)
  const [popup, setPopup] = useState<boolean>(false)
  const [loader, setLoader] = useState<boolean>(false)

  const imageRef = useRef<{ [banquet_id: number]: HTMLInputElement | null }>({})

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
  }

  const handleServiceChange = (e: ChangeEvent<HTMLInputElement>, banquetId: number) => {
    setCurrentRestaurant((prev: IRestaurantOptions | null) => {
      if (!prev) return prev

      const updatedBanquetOptions = prev.banquet_options.map((banquet) => {
        if (banquet.id === banquetId) {
          const value = Number(e.target.value)
          return {
            ...banquet,
            service_fee: isNaN(value) ? 0 : value,
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

    uploadFile(files[0]).then((res) => {
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
  }

  const isBanquetsChanged = useMemo(() => {
    if (currentRestaurant === initRestaurant) return false
    if (!currentRestaurant || !initRestaurant) return true

    return (
      currentRestaurant.image !== initRestaurant.image ||
      currentRestaurant.description !== initRestaurant.description
    )
  }, [currentRestaurant, initRestaurant])

  const sendBanquetDetails = () => {
    if (!isBanquetsChanged) return

    SendRestaurantOptions(
      {
        description: currentRestaurant?.description ? currentRestaurant?.description : null,
        image: currentRestaurant?.image ? currentRestaurant?.image : null,
      },
      currentId,
    )
      .then(() => {
        toast.success('Блок обновлён')
        getRestaurantData()
      })
      .catch(() => toast.error('Ошибка при сохранении'))
  }

  const sendBanquetOptions = (options: IRestaurantBanquet, banquet_id: number) => {
    SendBanquetsOptions(options, banquet_id)
      .then(() => {
        toast.success('Блок обновлён')
        getRestaurantData()
      })
      .catch(() => toast.error('Ошибка при сохранении'))
  }

  useEffect(() => {
    loadRestaurants()
  }, [])

  useEffect(() => {
    getRestaurantData()
  }, [currentId])

  return (
    <>
      <CreateOptionsPopup
        popup={[popup, setPopup]}
        restaurant_id={currentId}
        onCreate={getRestaurantData}
      />
      <ConfirmDeletePopup
        banquet_id={[currentBanquetId, setCurrentBanquetId]}
        onDelete={getRestaurantData}
      />
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
              <CCardGroup className={classNames('d-flex', 'flex-column', 'gap-4')}>
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
                          color="primary"
                          disabled={!isBanquetsChanged}
                          onClick={sendBanquetDetails}
                        >
                          Сохранить
                        </CButton>
                      </CRow>
                    </div>
                  </CCardBody>
                </CCard>
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
                                  floatingLabel="Название"
                                  placeholder={''}
                                  floatingClassName={'px-0'}
                                  value={banquet.name ? banquet.name : ''}
                                  onChange={(event) => handleNameChange(event, banquet.id)}
                                />
                              </CRow>
                              <CRow>
                                <CFormInput
                                  type="text"
                                  floatingLabel="Минимальное количество гостей"
                                  placeholder={''}
                                  floatingClassName={'px-0'}
                                  value={banquet.guests_min ? banquet.guests_min : ''}
                                  onChange={(event) =>
                                    handleGuestsCountChange(event, banquet.id, true)
                                  }
                                />
                              </CRow>
                              <CRow>
                                <CFormInput
                                  type="text"
                                  floatingLabel="Максимальное количество гостей"
                                  placeholder={''}
                                  floatingClassName={'px-0'}
                                  value={banquet.guests_max ? banquet.guests_max : ''}
                                  onChange={(event) =>
                                    handleGuestsCountChange(event, banquet.id, false)
                                  }
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
                                  onChange={(event) =>
                                    handleDepositMessageChange(event, banquet.id)
                                  }
                                />
                              </CRow>
                              <CRow>
                                <CFormInput
                                  type="text"
                                  floatingLabel="Обслуживание, %"
                                  placeholder={''}
                                  floatingClassName={'px-0'}
                                  value={banquet.service_fee ? banquet.service_fee : ''}
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
                              <CRow
                                className={classNames('d-flex', 'flex-nowrap', 'overflow-x-scroll')}
                              >
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
                                        className={classNames(
                                          'd-flex',
                                          'align-items-center',
                                          'gap-1',
                                        )}
                                        onClick={() => handleImageMove(banquet.id, index, true)}
                                      >
                                        <CIcon icon={cilArrowLeft} />
                                      </CButton>
                                      <CButton
                                        color="primary"
                                        size="sm"
                                        className={classNames(
                                          'd-flex',
                                          'align-items-center',
                                          'gap-1',
                                        )}
                                        onClick={() => handleImageMove(banquet.id, index, false)}
                                      >
                                        <CIcon icon={cilArrowRight} />
                                      </CButton>
                                      <CButton
                                        color="secondary"
                                        size="sm"
                                        className={classNames(
                                          'd-flex',
                                          'align-items-center',
                                          'gap-1',
                                        )}
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
                                  <CButton
                                    color="primary"
                                    onClick={() => handleAddImageClick(banquet.id)}
                                  >
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
                                  >
                                    Сохранить
                                  </CButton>
                                  <CButton
                                    color="secondary"
                                    className={'w-100'}
                                    onClick={() => setCurrentBanquetId(banquet.id)}
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
              </CCardGroup>
            )
          )}
        </CCardBody>
      </CCard>
    </>
  )
}

export default BanquetsPage
