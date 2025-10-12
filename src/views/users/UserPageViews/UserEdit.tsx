import { IUserFull, IUserPreferences } from 'src/types/User.ts'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCardImage,
  CCardTitle,
  CCol,
  CContainer,
  CRow,
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

  const getUserBookings = () => {
    let bookingsWithKids = 0
    let canceledBookings = 0
    let visitedBookings = 0
    if (user.bookings && user.bookings.length > 0) {
      user.bookings.forEach((booking) => {
        if (booking.children_count > 1) bookingsWithKids += 1
        if (booking.booking_status === 'canceled') canceledBookings += 1
        if (booking.booking_status === 'closed') visitedBookings += 1
      })
    }

    return { bookingsWithKids, canceledBookings, visitedBookings }
  }

  const { bookingsWithKids, canceledBookings, visitedBookings } = getUserBookings()

  const moodPreferences = preferencesList.find((p) => p.category === 'mood')?.choices || []
  const menuPreferences = preferencesList.find((p) => p.category === 'menu')?.choices || []
  const eventsPreferences = preferencesList.find((p) => p.category === 'events')?.choices || []

  const maxLength = Math.max(
    moodPreferences.length,
    menuPreferences.length,
    eventsPreferences.length,
  )

  return (
    <CContainer fluid>
      <CRow className="g-3 mb-4">
        <CCol md={4}>
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
                  <strong>Последнее редактирование:</strong>{' '}
                  {new Date(user.updated_at).toLocaleString()}
                </div>
                <div className="mt-3">
                  <div className="d-grid gap-2">
                    <span className="d-flex align-items-center justify-content-between">
                      <strong>Ранний доступ:</strong>
                      <CBadge color={getBadge(user.early_access)}>
                        {user.early_access ? 'Да' : 'Нет'}
                      </CBadge>
                    </span>
                    <span className="d-flex align-items-center justify-content-between">
                      <strong>Лиц. соглашение:</strong>
                      <CBadge color={getBadge(user.license_agreement)}>
                        {user.license_agreement ? 'Да' : 'Нет'}
                      </CBadge>
                    </span>
                    <span className="d-flex align-items-center justify-content-between">
                      <strong>Обработка данных:</strong>
                      <CBadge color={getBadge(user.gdpr_agreement)}>
                        {user.gdpr_agreement ? 'Да' : 'Нет'}
                      </CBadge>
                    </span>
                    <span className="d-flex align-items-center justify-content-between">
                      <strong>Рассылки:</strong>
                      <CBadge color={getBadge(user.advertisement_agreement)}>
                        {user.advertisement_agreement ? 'Да' : 'Нет'}
                      </CBadge>
                    </span>
                  </div>
                </div>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol md={8}>
          <CRow className="g-3 h-100">
            <CCol md={12} className={classNames('d-flex', 'flex-column', 'gap-3')}>
              {!user.mailing_enabled && (
                <CCard className="h-25">
                  <CCardBody className="d-flex align-items-center justify-content-center">
                    <div className="text-center">
                      <CBadge color="" className="fs-6">
                        Пользователь заблокировал бота
                      </CBadge>
                    </div>
                  </CCardBody>
                </CCard>
              )}
              <CCard className="border h-100">
                <CCardHeader>
                  <CCardTitle className="mb-0">Предпочтения</CCardTitle>
                </CCardHeader>
                <CCardBody>
                  {preferencesList.length > 0 ? (
                    <CTable striped responsive>
                      <CTableHead>
                        <CTableRow>
                          <CTableHeaderCell>Настроение</CTableHeaderCell>
                          <CTableHeaderCell>Меню</CTableHeaderCell>
                          <CTableHeaderCell>Форматы</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {Array.from({ length: maxLength }).map((_, index) => (
                          <CTableRow key={index}>
                            <CTableDataCell>{moodPreferences[index] || '-'}</CTableDataCell>
                            <CTableDataCell>{menuPreferences[index] || '-'}</CTableDataCell>
                            <CTableDataCell>{eventsPreferences[index] || '-'}</CTableDataCell>
                          </CTableRow>
                        ))}
                      </CTableBody>
                    </CTable>
                  ) : (
                    <div className="text-center text-muted py-3">Предпочтения не указаны</div>
                  )}
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CCol>
      </CRow>
      <CRow className="g-3">
        <CCol md={4}>
          <CCard className="border h-100">
            <CCardHeader>
              <CCardTitle className="mb-0">Теги</CCardTitle>
            </CCardHeader>
            <CCardBody className="d-flex align-items-center justify-content-center">
              <div className="text-muted">Клиент не использовал теги</div>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol md={4}>
          <CCard className="border h-100">
            <CCardHeader>
              <CCardTitle className="mb-0">Бронирования</CCardTitle>
            </CCardHeader>
            <CCardBody>
              {user.bookings && user.bookings.length > 0 ? (
                <div className="d-grid gap-2">
                  <span className="d-flex align-items-center justify-content-between">
                    <strong>Общее количество:</strong> {user.total_bookings}
                  </span>
                  <span className="d-flex align-items-center justify-content-between">
                    <strong>С детьми:</strong> {bookingsWithKids}
                  </span>
                  <span className="d-flex align-items-center justify-content-between">
                    <strong>Отмененных:</strong> {canceledBookings}
                  </span>
                  <span className="d-flex align-items-center justify-content-between">
                    <strong>Визитов:</strong> {visitedBookings}
                  </span>
                </div>
              ) : (
                <div
                  className={classNames(
                    'text-muted',
                    'd-flex',
                    'align-items-center',
                    'justify-content-center',
                  )}
                >
                  Бронирований нет
                </div>
              )}
            </CCardBody>
          </CCard>
        </CCol>
        {user.bookings && user.bookings.length > 0 && (
          <>
            <CCol md={4}>
              <CCard className="border h-100">
                <CCardHeader>
                  <CCardTitle className="mb-0">Города посещения/бронирования</CCardTitle>
                </CCardHeader>
                <CCardBody className="d-flex align-items-center justify-content-center">
                  <div className="text-muted">Данные отсутствуют</div>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol md={4}>
              <CCard className="border h-100">
                <CCardHeader>
                  <CCardTitle className="mb-0">Время посещений</CCardTitle>
                </CCardHeader>
                <CCardBody className="d-flex align-items-center justify-content-center">
                  <div className="text-muted">Данные отсутствуют</div>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol md={4}>
              <CCard className="border h-100">
                <CCardBody className="d-flex flex-column align-items-center justify-content-center">
                  <h6 className="text-muted mb-2">С последнего бронирования прошло:</h6>
                  <div className="fs-5 fw-bold text-primary">-</div>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol md={4}>
              <CCard className="border h-100">
                <CCardBody className="d-flex flex-column align-items-center justify-content-center">
                  <h6 className="text-muted mb-2">Дней с последнего визита:</h6>
                  <div className="fs-5 fw-bold text-primary">-</div>
                </CCardBody>
              </CCard>
            </CCol>
          </>
        )}
      </CRow>
    </CContainer>
  )
}
