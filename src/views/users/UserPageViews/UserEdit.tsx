import { IUserFull, IUserPreferences } from 'src/types/User.ts'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardGroup,
  CCardHeader,
  CCardImage,
  CCardTitle,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import classNames from 'classnames'
import css from 'src/views/style/layout.module.css'

interface Props {
  user: IUserFull
  preferences: IUserPreferences
}

export const UserEdit = ({ user, preferences }: Props) => {
  const preferencesList = preferences.preferences

  const getBadge = (status: boolean) => {
    return status ? 'success' : 'secondary'
  }

  const moodPreferences = preferencesList.find((p) => p.category === 'mood')?.choices || []
  const menuPreferences = preferencesList.find((p) => p.category === 'menu')?.choices || []
  const eventsPreferences = preferencesList.find((p) => p.category === 'events')?.choices || []

  const maxLength = Math.max(
    moodPreferences.length,
    menuPreferences.length,
    eventsPreferences.length,
  )

  return (
    <CCardGroup className={classNames('d-flex', 'gap-5')}>
      <CCard style={{ maxWidth: '18rem', width: '100%' }}>
        <CCardImage orientation="top" src={user?.photo_url} />
        <CCardBody>
          <CCardTitle>{user.first_name}</CCardTitle>
          <div className={classNames(css.fc8)}>
            <span>Телефон: {user.phone_number}</span>
            <span>Email: {user.email}</span>
            <span>Регистрация: {new Date(user.created_at).toLocaleString()}</span>
            <span>Посл.редакт.: {new Date(user.updated_at).toLocaleString()}</span>
            <span>
              Ранний доступ.{' '}
              <CBadge color={getBadge(user.early_access)}>
                {user.early_access ? 'Да' : 'Нет'}
              </CBadge>
            </span>
            <span>
              Лиц. соглашение{' '}
              <CBadge color={getBadge(user.license_agreement)}>
                {user.license_agreement ? 'Да' : 'Нет'}
              </CBadge>
            </span>
            <span>
              Обработка данных{' '}
              <CBadge color={getBadge(user.gdpr_agreement)}>
                {user.gdpr_agreement ? 'Да' : 'Нет'}
              </CBadge>
            </span>
            <span>
              Рассылки{' '}
              <CBadge color={getBadge(user.advertisement_agreement)}>
                {user.advertisement_agreement ? 'Да' : 'Нет'}
              </CBadge>
            </span>
          </div>
        </CCardBody>
      </CCard>
      <CCard className="border">
        <CCardHeader>
          <CTableHeaderCell>Предпочтения</CTableHeaderCell>
        </CCardHeader>
        <CCardBody>
          {preferencesList.length > 0 && (
            <CTable striped>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Что вам ближе по настроению?</CTableHeaderCell>
                  <CTableHeaderCell>Что вас особенно привлекает в меню?</CTableHeaderCell>
                  <CTableHeaderCell>Какие форматы вам интересны?</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {Array.from({ length: maxLength }).map((_, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell>{moodPreferences[index] || ''}</CTableDataCell>
                    <CTableDataCell>{menuPreferences[index] || ''}</CTableDataCell>
                    <CTableDataCell>{eventsPreferences[index] || ''}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          )}
        </CCardBody>
      </CCard>
    </CCardGroup>
  )
}
