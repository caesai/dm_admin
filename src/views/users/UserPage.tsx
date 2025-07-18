import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardImage,
  CCardText,
  CCardTitle,
  CCol,
  CFormSelect,
  CRow,
  CSpinner,
  CTab,
  CTabContent,
  CTabList,
  CTabPanel,
  CTabs,
} from '@coreui/react-pro'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { IUserFull } from 'src/types/User.ts'
import { getUserById } from 'src/dataProviders/users.ts'
// @ts-expect-error its ok
import css from '../style/layout.module.css'
import classNames from 'classnames'
import { UserEdit } from 'src/views/users/UserPageViews/UserEdit.tsx'
import { UserBookings } from 'src/views/users/UserPageViews/UserBookings.tsx'
import { UserReviews } from 'src/views/users/UserPageViews/UserReviews.tsx'
import { UserEvents } from 'src/views/users/UserPageViews/UserEvents.tsx'
import { UserPayments } from 'src/views/users/UserPageViews/UserPayments.tsx'
import { IAdmin } from 'src/types/Admin.ts'
import { getAdmins, setUserAdmin } from 'src/dataProviders/admins.ts'
import toast from 'react-hot-toast'

const UserPage = () => {
  const { id } = useParams()
  const [user, setUser] = useState<IUserFull>()
  const [adminList, setAdminList] = useState<IAdmin[]>([])

  useEffect(() => {
    getUserById(Number(id)).then((res) => setUser(res.data))
  }, [])

  useEffect(() => {
    getAdmins().then((res) => setAdminList(res.data))
  }, [])

  const updateAdmin = (user: IUserFull) => {
    if (!user.administrator) {
      return
    }
    toast('Обработка')
    setUserAdmin(user.id, user.administrator.id)
      .then(() => toast('Сохранено'))
      .catch(() => toast('Произошла ошибка при выполнении запроса.'))
  }

  const getBadge = (status: boolean) => {
    return status ? 'success' : 'secondary'
  }

  return !user ? (
    <CSpinner color="primary" />
  ) : (
    <CRow>
      <CCol>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Пользователь</strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <div className={classNames(css.fr8, css.w100, css.mobileWrap)}>
                <CCard style={{ width: '18rem', minWidth: '18rem' }}>
                  <CCardImage orientation="top" src={user?.photo_url} />
                  <CCardBody>
                    <CCardTitle>{user.first_name}</CCardTitle>
                    <CCardText>
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
                        {user ? (
                          <div className={classNames(css.fc8, 'mt-4')}>
                            <span>Администратор</span>
                            <CFormSelect
                              value={user.administrator ? String(user.administrator.id) : 'none'}
                              onChange={(event) =>
                                setUser((prev) => ({
                                  ...prev!,
                                  administrator: {
                                    id: Number(event.target.value),
                                    is_active: true,
                                  },
                                }))
                              }
                            >
                              <option value="none">Не администратор</option>
                              {adminList.map((admin) => (
                                <option key={admin.login} value={`${admin.id}`}>
                                  {admin.login}
                                </option>
                              ))}
                            </CFormSelect>
                            <CButton color={'primary'} onClick={() => updateAdmin(user)}>
                              Сохранить
                            </CButton>
                          </div>
                        ) : null}
                      </div>
                    </CCardText>
                  </CCardBody>
                </CCard>
                <CCard className={classNames(css.w100)}>
                  <CCardHeader>
                    <strong>Информация</strong>
                  </CCardHeader>
                  <CCardBody>
                    <CTabs activeItemKey="profile">
                      <CTabList variant="tabs">
                        <CTab itemKey="home" defaultChecked={true}>
                          Профиль
                        </CTab>
                        <CTab itemKey="bookings">Бронь</CTab>
                        <CTab itemKey="events">Мероприятия</CTab>
                        <CTab itemKey={'reviews'}>Отзывы</CTab>
                        <CTab itemKey={'payments'}>Платежи</CTab>
                      </CTabList>
                      <CTabContent>
                        <CTabPanel className="p-3" itemKey="home">
                          <UserEdit user={user} />
                        </CTabPanel>
                        <CTabPanel className="p-3" itemKey="bookings">
                          <UserBookings user={user} />
                        </CTabPanel>
                        <CTabPanel className="p-3" itemKey="events">
                          <UserEvents user={user} />
                        </CTabPanel>
                        <CTabPanel className="p-3" itemKey="reviews">
                          <UserReviews user={user} />
                        </CTabPanel>
                        <CTabPanel className="p-3" itemKey="payments">
                          <UserPayments user={user} />
                        </CTabPanel>
                      </CTabContent>
                    </CTabs>
                  </CCardBody>
                </CCard>
              </div>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default UserPage
