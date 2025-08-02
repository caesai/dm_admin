import {
  CLoadingButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react-pro'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import { deleteMailing } from 'src/dataProviders/mailing.ts'
import toast from 'react-hot-toast'

const DeleteMailingPopup: FC<{
  popup: [number, Dispatch<SetStateAction<number | null>>]
  onUpdate: () => void
}> = ({ popup, onUpdate }) => {
  const [id, setId] = popup
  const [isDeleting, setIsDeleting] = useState(false)

  const confirmDelete = async () => {
    setIsDeleting(true)
    await deleteMailing(id)
      .then(() => {
        setId(null)
        toast.success('Рассылка успешно удалена.')
      })
      .catch((error) => {
        toast.error('Ошибка удаления рассылки: ' + error)
      })
      .finally(() => {
        setIsDeleting(false)
        onUpdate()
      })
  }
  return (
    <CModal alignment="center" visible={id !== null} onClose={() => setId(null)}>
      <CModalHeader>
        <CModalTitle>Подтверждение удаления</CModalTitle>
      </CModalHeader>
      <CModalBody>Подтвердите удаление сообщения!</CModalBody>
      <CModalFooter>
        <CLoadingButton color="secondary" className="w-100" onClick={() => setId(null)}>
          Отменить
        </CLoadingButton>
        <CLoadingButton
          color="primary"
          className="w-100"
          loading={isDeleting}
          onClick={confirmDelete}
        >
          Удалить
        </CLoadingButton>
      </CModalFooter>
    </CModal>
  )
}

export default DeleteMailingPopup
