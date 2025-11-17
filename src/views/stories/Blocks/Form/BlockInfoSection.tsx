import { FC, ChangeEvent } from 'react'
import { CFormInput, CFormCheck, CRow } from '@coreui/react-pro'
import MediaInput from 'src/components/MediaInput.tsx'
import TooltipInfo from 'src/components/TooltipInfo.tsx'

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
            <TooltipInfo content="Название блока историй. Максимальная длина - 27 символов" />
          </div>
        </div>
      </CRow>
      <CRow className="mb-3">
        <div className="d-flex align-items-center gap-2 p-0">
          <CFormCheck label="Активный блок" onChange={onActiveChange} checked={isActive} />
          <TooltipInfo content="В приложении показываются только активные блоки историй. Если чекбокс отключен, история будет не доступна" />
        </div>
      </CRow>
      <CRow className="mb-3">
        <div className="d-flex align-items-center gap-2 p-0">
          <div className="position-relative w-100">
            <CFormInput
              type="text"
              placeholder="Обложка блока историй"
              value={thumbnail}
              onInput={onThumbnailChange}
            />
            {thumbnail === '' && (
              <div className="position-absolute" style={{ top: '20%', left: '25ex' }}>
                <strong className="fs-5">*</strong>
              </div>
            )}
          </div>
          <MediaInput onChange={(e) => onImageUpload(e.target.files)} />
          <TooltipInfo content="Обложка истории отображается на главной странице приложения в блоке историй. Вставьте ссылку на изображение, либо загрузите его, нажав на кнопку. Избражение должно быть квадратное" />
        </div>
      </CRow>
    </>
  )
}
