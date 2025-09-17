import { FC } from 'react'
import { CRow, CButton, CLoadingButton } from '@coreui/react-pro'

interface ActionButtonsProps {
  isEdit: boolean
  isActive: boolean
  isLoading: boolean
  onCancel: () => void
  onSave: () => void
  onDelete: () => void
}

export const ActionButtons: FC<ActionButtonsProps> = ({
  isEdit,
  isActive,
  isLoading,
  onCancel,
  onSave,
  onDelete,
}) => {
  return (
    <CRow className="mb-3">
      <div className="mb-3 d-flex flex-nowrap gap-2 p-0">
        {isEdit && (
          <CButton color="danger" className="px-2 text-white" onClick={onDelete}>
            Удалить
          </CButton>
        )}
        <CButton color="secondary" className="w-100" onClick={onCancel}>
          Отмена
        </CButton>
        <CLoadingButton
          color="primary"
          className="w-100"
          loading={isLoading}
          onClick={onSave}
          disabled={!isActive}
        >
          {isEdit ? 'Сохранить изменения' : 'Опубликовать'}
        </CLoadingButton>
      </div>
    </CRow>
  )
}
