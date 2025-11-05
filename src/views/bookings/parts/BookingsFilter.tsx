import {
  CCard,
  CCardBody,
  CCardHeader,
  CFormInput,
  CFormSelect,
  CLoadingButton,
  CRow,
} from '@coreui/react-pro'
import { ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import classNames from 'classnames'
import { getRestaurantCity } from 'src/utils.tsx'
import { IRestaurantWCity } from 'src/types/Restaurant.ts'
import { IBookingWithRestaurant } from 'src/types/Booking.ts'
import { getBookings } from 'src/dataProviders/bookings.ts'
import toast from 'react-hot-toast'

const searchOptions = [
  { label: 'Выберите вариант', value: '' },
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
  setBookings: Dispatch<SetStateAction<IBookingWithRestaurant[]>>
}

const BookingsFilter: FC<IBookingsFilterProps> = ({ restaurants, setBookings }) => {
  const [currentSearchOption, setSearchOption] = useState<string>('')
  const [searchValue, setSearchValue] = useState<string>('')
  const [restaurantId, setRestaurantId] = useState<number>(0)
  const [currentBookingStatus, setBookingStatus] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const changeSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
    if (currentSearchOption === '') return
    setSearchValue(e.target.value)
  }

  const changeRestaurantId = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === '') {
      setRestaurantId(0);
      return;
    }
    setRestaurantId(Number(e.target.value));
  }

  const checkValidFilter = () => {
    const hasValidSearch = searchValue === ''
    const hasNoRestaurantFilter = restaurantId === 0
    const hasNoStatusFilter = currentBookingStatus === ''

    return hasValidSearch && hasNoRestaurantFilter && hasNoStatusFilter
  }

  const sendFilters = () => {
    setLoading(true)
    getBookings({
      search: searchValue !== '' ? searchValue : undefined,
      restaurant_id: restaurantId !== 0 ? restaurantId : undefined,
      booking_status: currentBookingStatus !== '' ? currentBookingStatus : undefined,
    })
      .then((res) => setBookings(res.data.bookings))
      .catch(() => toast.error('Что-то пошло не так'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    checkValidFilter()
  }, [searchValue, restaurantId, currentBookingStatus])

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
              value={currentSearchOption}
              onChange={(e) => setSearchOption(e.target.value)}
              className="w-75"
            />
            <CFormInput
              placeholder={currentSearchOption}
              className="w-25"
              value={searchValue}
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
              value={currentBookingStatus}
              onChange={(e) => setBookingStatus(e.target.value)}
            />
          </div>
        </CRow>
        <CRow>
          <div>
            <CLoadingButton
              color="primary"
              className="w-100"
              disabled={checkValidFilter()}
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
