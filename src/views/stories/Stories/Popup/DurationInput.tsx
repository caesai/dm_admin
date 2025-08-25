import { CFormInput, CTooltip } from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { cilInfo } from '@coreui/icons'
import { ChangeEvent, FC } from 'react'
import classNames from 'classnames'

interface DurationInputProps {
  duration: number
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const DurationInput: FC<DurationInputProps> = ({ duration, onChange }) => {
  return (
    <div className={classNames('d-flex', 'align-items-center', 'gap-2')}>
      <div className={classNames('position-relative', 'w-100')}>
        <CFormInput
          placeholder="Длительность в секундах"
          value={duration !== 0 ? duration : ''}
          onChange={onChange}
        />
        {!duration && (
          <strong className="fs-5" style={{ position: 'absolute', top: '20%', left: '21ex' }}>
            *
          </strong>
        )}
      </div>
      <CTooltip content="Текст тултипа">
        <CIcon icon={cilInfo} />
      </CTooltip>
    </div>
  )
}

export default DurationInput
