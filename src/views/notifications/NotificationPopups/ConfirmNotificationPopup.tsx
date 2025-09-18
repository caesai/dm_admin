import {
  CLoadingButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react-pro'
import { Dispatch, FC, SetStateAction, useState } from 'react'

const ConfirmNotificationPopup: FC<{
  popup: [boolean, Dispatch<SetStateAction<boolean>>]
  onConfirm: () => Promise<void>
}> = ({ popup, onConfirm }) => {
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

  return (
    <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
      <CModalHeader>
        <CModalTitle>Подтверждение рассылки</CModalTitle>
      </CModalHeader>
      <CModalBody>Сообщение будет отправлено всем пользователям!</CModalBody>
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
