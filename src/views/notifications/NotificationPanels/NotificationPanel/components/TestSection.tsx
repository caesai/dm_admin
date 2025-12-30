import {
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormInput,
  CInputGroup,
  CLoadingButton,
} from '@coreui/react-pro'
import TooltipInfo from 'src/components/TooltipInfo'

interface TestSectionProps {
  testUserName: string
  setTestUserName: (name: string) => void
  groupNotificationIsInProgress: boolean
  notifyGroup: () => void
}

export const TestSection = ({
  testUserName,
  setTestUserName,
  groupNotificationIsInProgress,
  notifyGroup,
}: TestSectionProps) => {
  return (
    <CCard className="mx-2">
      <CCardHeader>
        <div className="d-flex align-items-center">
          <p>Тест рассылки</p>
          <div className="ms-2">
            <TooltipInfo content="Введите Telegram ID пользователя для теста рассылки" />
          </div>
        </div>
      </CCardHeader>
      <CCardBody>
        <CForm>
          <CInputGroup className="mb-3">
            <CFormInput
              placeholder="Telegram ID"
              type="text"
              value={testUserName}
              onChange={(e) => setTestUserName(e.target.value)}
            />
          </CInputGroup>
          <CLoadingButton
            color="primary"
            className="px-4"
            loading={groupNotificationIsInProgress}
            onClick={notifyGroup}
          >
            Тест
          </CLoadingButton>
        </CForm>
      </CCardBody>
    </CCard>
  )
}
