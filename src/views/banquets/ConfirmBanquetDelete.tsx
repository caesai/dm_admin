import {
  CLoadingButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react-pro'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import { DeleteBanquetsOptions } from 'src/dataProviders/restaurants.ts'

const ConfirmBanquetDelete: FC<{
  banquet_id: [number | null, Dispatch<SetStateAction<number | null>>]
  onDelete: () => void
}> = ({ banquet_id, onDelete }) => {
  const [banquetId, setBanquetId] = banquet_id
  const [isDeleting, setDeleting] = useState(false)

  const handleConfirm = async () => {
    if (!banquetId) return

    try {
      setDeleting(true)
      await DeleteBanquetsOptions(banquetId)
    } finally {
      setDeleting(false)
      setBanquetId(null)
      onDelete()
    }
  }

  return (
    <CModal alignment="center" visible={banquetId !== null} onClose={() => setBanquetId(null)}>
      <CModalHeader>
        <CModalTitle>Удаление варианта рассадки</CModalTitle>
      </CModalHeader>
      <CModalBody>Вариант будет удален из базы данных!</CModalBody>
      <CModalFooter>
        <CLoadingButton
          color="primary"
          className="w-100"
          loading={isDeleting}
          onClick={handleConfirm}
        >
          Удалить
        </CLoadingButton>
      </CModalFooter>
    </CModal>
  )
}

export default ConfirmBanquetDelete
