import {
  CCard,
  CCardBody,
  CCardGroup,
  CCardHeader,
  CCardTitle,
  CFormSelect,
  CSpinner,
} from '@coreui/react-pro'
import { getRestaurantCity } from 'src/utils.tsx'
import { ChangeEvent, useEffect, useState } from 'react'
import { IRestaurantOptions, IRestaurantWCity } from 'src/types/Restaurant.ts'
import { GetRestaurantList } from 'src/dataProviders/restaurants.ts'
import toast from 'react-hot-toast'
import classNames from 'classnames'
import ConfirmDeletePopup from 'src/views/banquets/popups/ConfirmDeletePopup.tsx'
import CreateOptionsPopup from 'src/views/banquets/popups/CreateOptionsPopup.tsx'
import AdditionalOptions from 'src/views/banquets/blocks/AdditionalOptions.tsx'
import { GetRestaurantOptions } from 'src/dataProviders/banquets.ts'
import BanquetInfo from 'src/views/banquets/blocks/BanquetInfo.tsx'
import PlacementVariants from 'src/views/banquets/blocks/PlacementVariants.tsx'

const BanquetsPage = () => {
  const [currentId, setCurrentId] = useState<number>(0)
  const [restaurants, setRestaurants] = useState<IRestaurantWCity[]>([])
  const [currentRestaurant, setCurrentRestaurant] = useState<IRestaurantOptions | null>(null)
  const [banquetToDeleteId, setBanquetToDeleteId] = useState<number | null>(null)
  const [popup, setPopup] = useState<boolean>(false)
  const [loader, setLoader] = useState<boolean>(false)

  const loadRestaurants = async () => {
    const response = await GetRestaurantList()
    setRestaurants(response.data)
  }

  const changeRestaurantId = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === '') setCurrentId(0)
    else setCurrentId(Number(e.target.value))
  }

  const getRestaurantData = () => {
    if (currentId === 0) return
    setLoader(true)

    GetRestaurantOptions(currentId)
      .then((res) => {
        setCurrentRestaurant(res.data)
        setLoader(false)
      })
      .catch(() => toast.error('Не удалось загрузить данные о ресторане'))
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
        banquet_id={[banquetToDeleteId, setBanquetToDeleteId]}
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
            currentId !== 0 &&
            currentRestaurant !== null && (
              <CCardGroup className={classNames('d-flex', 'flex-column', 'gap-4')}>
                <BanquetInfo
                  restaurant={[currentRestaurant, setCurrentRestaurant]}
                  currentId={currentId}
                  onUpdate={getRestaurantData}
                />
                <PlacementVariants
                  restaurant={[currentRestaurant, setCurrentRestaurant]}
                  setBanquetToDeleteId={setBanquetToDeleteId}
                  setPopup={setPopup}
                  onUpdate={getRestaurantData}
                />
                <AdditionalOptions
                  restaurant_id={currentId}
                  options={currentRestaurant.additional_options}
                  onSave={getRestaurantData}
                />
              </CCardGroup>
            )
          )}
        </CCardBody>
      </CCard>
    </>
  )
}

export default BanquetsPage
