import { CFormInput, CFormCheck, CTooltip } from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { cilInfo } from '@coreui/icons'
import { ChangeEvent, FC } from 'react'
import classNames from 'classnames'

interface ComponentFieldsProps {
  title: string | null
  description: string | null
  isActiveButton: boolean
  onTitleChange: (e: ChangeEvent<HTMLInputElement>) => void
  onDescriptionChange: (e: ChangeEvent<HTMLInputElement>) => void
  onButtonToggle: () => void
}

const ComponentFields: FC<ComponentFieldsProps> = ({
  title,
  description,
  isActiveButton,
  onTitleChange,
  onDescriptionChange,
  onButtonToggle,
}) => {
  return (
    <div className={classNames('d-flex', 'flex-column', 'gap-2')}>
      <CFormInput
        placeholder="Заголовок"
        value={title !== null ? title : ''}
        onInput={onTitleChange}
      />
      <CFormInput
        placeholder="Описание"
        value={description !== null ? description : ''}
        onInput={onDescriptionChange}
      />
      <div className={classNames('d-flex', 'align-items-center', 'gap-2')}>
        <CFormCheck label="Кнопка" checked={isActiveButton} onChange={onButtonToggle} />
        <CTooltip content="Текст тултипа">
          <CIcon icon={cilInfo} />
        </CTooltip>
      </div>
    </div>
  )
}

export default ComponentFields
