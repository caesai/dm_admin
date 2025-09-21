import {
  CLoadingButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react-pro'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import { IRestaurantWCity } from 'src/types/Restaurant.ts'

const ConfirmNotificationPopup: FC<{
  popup: [boolean, Dispatch<SetStateAction<boolean>>]
  restaurant?: IRestaurantWCity
  onConfirm: () => Promise<void>
}> = ({ popup, restaurant, onConfirm }) => {
  const [visible, setVisible] = popup
  const [allNotificationIsInProgress, setAllNotificationIsInProgress] = useState(false)

  const handleConfirm = async () => {
    try {
      setAllNotificationIsInProgress(true)
      await onConfirm()
      setVisible(false)
    } finally {
      setAllNotificationIsInProgress(false)
    }
  }

  const checkRestaurantCity = () => {
    if (restaurant?.title === 'Smoke BBQ' && restaurant?.city.name === 'Санкт-Петербург') {
      return restaurant?.address
    }
    return restaurant?.city.name
  }

  return (
    <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
      <CModalHeader>
        <CModalTitle>Подтверждение рассылки</CModalTitle>
      </CModalHeader>
      <CModalBody>
        Сообщение будет отправлено{' '}
        {restaurant?.title
          ? `клиентам ${restaurant.title}, ${checkRestaurantCity()}`
          : 'всем клиентам'}
        !
      </CModalBody>
      <CModalFooter>
        <CLoadingButton
          color="primary"
          className="w-100"
          loading={allNotificationIsInProgress}
          onClick={handleConfirm}
        >
          Отправить
        </CLoadingButton>
      </CModalFooter>
    </CModal>
  )
}

export default ConfirmNotificationPopup
