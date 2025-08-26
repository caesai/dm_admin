import { CFormInput } from '@coreui/react-pro'
import { ChangeEvent, FC } from 'react'
import classNames from 'classnames'
import MediaInput from 'src/components/MediaInput.tsx'
import TooltipInfo from 'src/components/TooltipInfo.tsx'

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
      <TooltipInfo content="Текст тултипа" />
    </div>
  )
}

export default MediaUrlInput
