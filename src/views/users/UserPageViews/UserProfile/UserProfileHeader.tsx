import { IUserFull } from 'src/types/User.ts'
import { CCard, CCardBody, CCardImage, CCardTitle } from '@coreui/react-pro'
import classNames from 'classnames'
import css from 'src/views/style/layout.module.css'

interface Props {
  user: IUserFull
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
          <div className="mb-2">
            <strong>
              {user.mailing_enabled
                ? 'Пользователь получает рассылку'
                : 'Пользователь отказался от рассылки'}
            </strong>
          </div>
        </div>
      </CCardBody>
    </CCard>
  )
}
