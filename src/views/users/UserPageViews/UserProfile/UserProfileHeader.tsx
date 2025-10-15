import { IUserFull } from 'src/types/User.ts'
import { CCard, CCardBody, CCardImage, CCardTitle, CBadge } from '@coreui/react-pro'
import classNames from 'classnames'
import css from 'src/views/style/layout.module.css'

interface Props {
  user: IUserFull
}

const getBadge = (status: boolean) => {
  return status ? 'success' : 'secondary'
}

export const UserProfileHeader = ({ user }: Props) => {
  return (
    <CCard className="shadow-sm h-100">
      <CCardBody className="d-flex flex-column">
        <div className="text-center mb-3">
          <CCardImage orientation="top" src={user?.photo_url} />
        </div>
        <CCardTitle className="h4 mb-3 text-center">
          {user.first_name} {user.last_name || ''}
        </CCardTitle>
        <div className={classNames(css.fc8, 'flex-grow-1')}>
          <div className="mb-2">
            <strong>Телефон:</strong> {user.phone_number}
          </div>
          <div className="mb-2">
            <strong>Email:</strong> {user.email}
          </div>
          <div className="mb-2">
            <strong>Регистрация:</strong> {new Date(user.created_at).toLocaleString()}
          </div>
          <div className="mb-2">
            <strong>Последнее редактирование:</strong> {new Date(user.updated_at).toLocaleString()}
          </div>
          <div className="mt-3">
            <div className="d-grid gap-2">
              <AgreementBadge label="Ранний доступ:" value={user.early_access} />
              <AgreementBadge label="Лиц. соглашение:" value={user.license_agreement} />
              <AgreementBadge label="Обработка данных:" value={user.gdpr_agreement} />
              <AgreementBadge label="Рассылки:" value={user.advertisement_agreement} />
            </div>
          </div>
        </div>
      </CCardBody>
    </CCard>
  )
}

const AgreementBadge = ({ label, value }: { label: string; value: boolean }) => (
  <span className="d-flex align-items-center justify-content-between">
    <strong>{label}</strong>
    <CBadge color={getBadge(value)}>{value ? 'Да' : 'Нет'}</CBadge>
  </span>
)
