import { FC, ChangeEvent } from 'react'
import { CFormInput, CFormCheck, CTooltip, CRow } from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { cilInfo } from '@coreui/icons'
import MediaInput from 'src/components/MediaInput.tsx'

interface BlockInfoSectionProps {
  blockName: string
  onNameChange: (e: ChangeEvent<HTMLInputElement>) => void
  isActive: boolean
  onActiveChange: () => void
  thumbnail: string
  onThumbnailChange: (e: ChangeEvent<HTMLInputElement>) => void
  onImageUpload: (files: FileList | null) => void
}

export const BlockInfoSection: FC<BlockInfoSectionProps> = ({
  blockName,
  onNameChange,
  isActive,
  onActiveChange,
  thumbnail,
  onThumbnailChange,
  onImageUpload,
}) => {
  return (
    <>
      <CRow className="mb-3">
        <div className="d-flex align-items-center p-0">
          <div className="position-relative w-100">
            <CFormInput type="text" placeholder="Имя" onInput={onNameChange} value={blockName} />
            {blockName === '' && (
              <div className="position-absolute" style={{ top: '20%', left: '6ex' }}>
                <strong className="fs-5">*</strong>
              </div>
            )}
          </div>
          <div className="ms-2">
            <CTooltip content="Текст тултипа">
              <CIcon icon={cilInfo} />
            </CTooltip>
          </div>
        </div>
      </CRow>
      <CRow className="mb-3">
        <div className="d-flex align-items-center gap-2 p-0">
          <CFormCheck label="Активный блок" onChange={onActiveChange} checked={isActive} />
          <strong className="fs-5" style={{ transform: 'translateY(10%)' }}>
            *
          </strong>
          <CTooltip content="Текст тултипа">
            <CIcon icon={cilInfo} />
          </CTooltip>
        </div>
      </CRow>

      <CRow className="mb-3">
        <div className="d-flex align-items-center gap-2 p-0">
          <CFormInput
            type="text"
            placeholder="URL обложки"
            value={thumbnail || ''}
            onInput={onThumbnailChange}
          />
          <MediaInput onChange={(e) => onImageUpload(e.target.files)} />
          <CTooltip content="Текст тултипа">
            <CIcon icon={cilInfo} />
          </CTooltip>
        </div>
      </CRow>
    </>
  )
}
