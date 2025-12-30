import { CCard, CCardBody, CCardHeader, CForm, CFormInput } from '@coreui/react-pro'
import TooltipInfo from 'src/components/TooltipInfo'
import { IMedia } from 'src/types/Media.ts'

interface ButtonSectionProps {
  media: IMedia[]
  documentFile: IMedia | null
  buttonText: string
  setButtonText: (text: string) => void
  buttonUrl: string
  setButtonUrl: (url: string) => void
}

export const ButtonSection = ({
  media,
  documentFile,
  buttonText,
  setButtonText,
  buttonUrl,
  setButtonUrl,
}: ButtonSectionProps) => {
  if (media.length > 1 || documentFile) {
    return null
  }

  return (
    <CCard className="mb-4 mx-2">
      <CCardHeader>
        <div className="d-flex align-items-center">
          <p>Кнопка</p>
          <div className="ms-2">
            <TooltipInfo content="Если прикрепить к рассылке кнопку, то возможно прикрепление только одного медиафайла." />
          </div>
        </div>
      </CCardHeader>
      <CCardBody>
        <CForm className="flex-column gap-4" style={{ display: 'flex' }}>
          <CFormInput
            placeholder="Текст кнопки"
            type="text"
            value={buttonText}
            onChange={(e) => setButtonText(e.target.value)}
          />
          <CFormInput
            placeholder="Url кнопки"
            type="text"
            value={buttonUrl}
            onChange={(e) => setButtonUrl(e.target.value)}
          />
        </CForm>
      </CCardBody>
    </CCard>
  )
}
