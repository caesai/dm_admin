import { CFormInput } from '@coreui/react-pro'
import { ChangeEvent, FC } from 'react'
import classNames from 'classnames'

interface ButtonFieldsProps {
  buttonUrl: string | null
  buttonText: string | null
  buttonColor: string | null
  onUrlChange: (e: ChangeEvent<HTMLInputElement>) => void
  onTextChange: (e: ChangeEvent<HTMLInputElement>) => void
  onColorChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const ButtonFields: FC<ButtonFieldsProps> = ({
  buttonUrl,
  buttonText,
  buttonColor,
  onUrlChange,
  onTextChange,
  onColorChange,
}) => {
  return (
    <div className={classNames('d-flex', 'flex-column', 'gap-2')}>
      <div className={classNames('position-relative', 'w-100')}>
        <CFormInput
          placeholder="URL"
          value={buttonUrl !== null ? buttonUrl : ''}
          onInput={onUrlChange}
        />
        {buttonUrl === null && (
          <strong className="fs-5" style={{ position: 'absolute', top: '20%', left: '5ex' }}>
            *
          </strong>
        )}
      </div>
      <div className={classNames('position-relative', 'w-100')}>
        <CFormInput
          placeholder="Текст"
          value={buttonText !== null ? buttonText : ''}
          onInput={onTextChange}
        />
        {buttonText === null && (
          <strong className="fs-5" style={{ position: 'absolute', top: '20%', left: '6ex' }}>
            *
          </strong>
        )}
      </div>
      <div
        className={classNames('d-flex', 'align-items-center', 'gap-2', 'border', 'rounded', 'px-2')}
      >
        <CFormInput
          type="color"
          className="border-0"
          value={buttonColor !== null ? buttonColor : ''}
          onInput={onColorChange}
          label={
            <>
              Цвет
              <strong className={classNames('ms-2', 'align-middle', 'fs-5')}>*</strong>
            </>
          }
        />
      </div>
    </div>
  )
}

export default ButtonFields
