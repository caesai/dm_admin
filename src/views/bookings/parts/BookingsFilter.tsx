import {
  CCard,
  CCardBody,
  CCardHeader,
  CFormInput,
  CFormSelect,
  CLoadingButton,
  CRow,
} from '@coreui/react-pro'
import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from 'react'
import classNames from 'classnames'
import { getRestaurantCity } from 'src/utils.tsx'
import { IRestaurantWCity } from 'src/types/Restaurant.ts'
import { IBookingFilterProps } from 'src/dataProviders/bookings.ts'

const searchOptions = [
  { label: 'Данные клиента', value: '' },
  { label: 'Имя', value: 'Имя' },
  { label: 'Телефон', value: 'Телефон' },
  { label: 'Email', value: 'Email' },
]

const bookingStatusOptions = [
  { label: 'Статус бронирования', value: '' },
  { label: 'new', value: 'new' },
  { label: 'confirmed', value: 'confirmed' },
  { label: 'closed', value: 'closed' },
  { label: 'cancelled', value: 'cancelled' },
]

interface IBookingsFilterProps {
  restaurants: IRestaurantWCity[]
  filters: [IBookingFilterProps, Dispatch<SetStateAction<IBookingFilterProps>>]
  loading: boolean
  sendFilters: () => void
}

const BookingsFilter: FC<IBookingsFilterProps> = ({
  restaurants,
  filters,
  loading,
  sendFilters,
}) => {
  const [currentSearchOption, setSearchOption] = useState<string>('')
  const [currentFilters, setFilters] = filters

  const changeSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
    if (currentSearchOption === '') return
    setFilters((prev) => ({
      ...prev,
      search: e.target.value,
    }))
  }

  const changeRestaurantId = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === '') {
      setFilters((prev) => ({
        ...prev,
        restaurant_id: 0,
      }))
      return
    }
    setFilters((prev) => ({
      ...prev,
      restaurant_id: Number(e.target.value),
    }))
  }

  const changeBookingStatus = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev) => ({
      ...prev,
      booking_status: e.target.value,
    }))
  }

  return (
    <CCard>
      <CCardHeader>
        <strong>Фильтры</strong>
      </CCardHeader>
      <CCardBody className={classNames('d-flex', 'flex-column', 'gap-3')}>
        <CRow>
          <div className={classNames('d-flex', 'gap-4')}>
            <CFormSelect
              options={searchOptions}
              value={currentFilters.search}
              onChange={(e) => setSearchOption(e.target.value)}
              className="w-75"
            />
            <CFormInput
              placeholder={currentSearchOption}
              className="w-25"
              value={currentFilters.search}
              onChange={changeSearchValue}
            />
          </div>
        </CRow>
        <CRow>
          <div>
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
          </div>
        </CRow>
        <CRow>
          <div>
            <CFormSelect
              options={bookingStatusOptions}
              value={currentFilters.booking_status}
              onChange={changeBookingStatus}
            />
          </div>
        </CRow>
        <CRow>
          <div>
            <CLoadingButton
              color="primary"
              className="w-100"
              loading={loading}
              onClick={sendFilters}
            >
              Поиск
            </CLoadingButton>
          </div>
        </CRow>
      </CCardBody>
    </CCard>
  )
}

export default BookingsFilter
