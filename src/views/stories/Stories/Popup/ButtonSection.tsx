import { CButton } from '@coreui/react-pro'
import { FC } from 'react'
import classNames from 'classnames'

interface ButtonSectionProps {
  isActive: boolean
  onCancel: () => void
  onSave: () => void
}

const ButtonSection: FC<ButtonSectionProps> = ({ onCancel, onSave, isActive }) => {
  return (
    <div className={classNames('mt-auto', 'd-flex', 'gap-2')}>
      <CButton color="secondary" className="w-100" onClick={onCancel}>
        Отмена
      </CButton>
      <CButton color="primary" className="w-100" onClick={onSave} disabled={!isActive}>
        Сохранить
      </CButton>
    </div>
  )
}

export default ButtonSection
