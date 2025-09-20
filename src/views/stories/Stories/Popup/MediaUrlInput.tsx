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
  let tooltipText = 'Введите ссылку на изображение или загрузите его, нажав на кнопку'
  if (type === 'component')
    tooltipText = 'Введите ссылку на изображение или загрузите его, нажав на кнопку'
  if (type === 'video') tooltipText = 'Загрузите файл mp4, либо ссылку на видео в формате mp4'

  return (
    <div className={classNames('d-flex', 'align-items-center', 'gap-2', 'p-0')}>
      <div className={classNames('position-relative', 'w-100')}>
        <CFormInput
          type="text"
          placeholder={
            type === 'component' || type === 'image' ? 'Ссылка на изображение' : 'Ссылка на видео'
          }
          value={url === null ? '' : url}
          onInput={onUrlChange}
        />
        {!url && (
          <strong
            className="fs-5"
            style={{ position: 'absolute', top: '20%', left: type === 'video' ? '14ex' : '20ex' }}
          >
            *
          </strong>
        )}
      </div>
      <MediaInput onChange={(e) => onMediaChange(e.target.files)} isVideo={type === 'video'} />
      <TooltipInfo content={tooltipText} />
    </div>
  )
}

export default MediaUrlInput
