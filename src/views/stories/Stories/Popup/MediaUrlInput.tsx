import { CFormInput, CTooltip } from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { cilInfo } from '@coreui/icons'
import { ChangeEvent, FC } from 'react'
import classNames from 'classnames'
import MediaInput from 'src/components/MediaInput.tsx'

interface MediaUrlInputProps {
  url: string | null
  type: string
  onUrlChange: (e: ChangeEvent<HTMLInputElement>) => void
  onMediaChange: (files: FileList | null) => void
}

const MediaUrlInput: FC<MediaUrlInputProps> = ({ url, type, onUrlChange, onMediaChange }) => {
  return (
    <div className={classNames('d-flex', 'align-items-center', 'gap-2', 'p-0')}>
      <CFormInput
        type="text"
        placeholder={type === 'COMPONENT' ? 'Контент URL' : 'URL обложки'}
        value={url === null ? '' : url}
        onInput={onUrlChange}
      />
      <MediaInput onChange={(e) => onMediaChange(e.target.files)} isVideo={type === 'VIDEO'} />
      <CTooltip content="Текст тултипа">
        <CIcon icon={cilInfo} />
      </CTooltip>
    </div>
  )
}

export default MediaUrlInput
