import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
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
import { IUserFull, IUserPreferences } from 'src/types/User.ts'
import {
  getUserBookings,
  getUserById,
  getUserEvents,
  getUserLogs,
  getUserPreferences,
} from 'src/dataProviders/users.ts'
import css from '../style/layout.module.css'
import classNames from 'classnames'
import { UserProfile } from 'src/views/users/UserPageViews/UserProfile/UserProfile.tsx'
import { UserBookings } from 'src/views/users/UserPageViews/UserBookings.tsx'
import { IBookingWithRestaurant } from 'src/types/Booking.ts'
import { UserLogs } from 'src/views/users/UserPageViews/UserLogs.tsx'
import { ILogs } from 'src/types/Logs.ts'
import { UserEvents } from 'src/views/users/UserPageViews/UserEvents.tsx'
import { IEventBookingBase } from 'src/types/Event.ts'
import { UserBanquets } from 'src/views/users/UserPageViews/UserBanquets.tsx'
import { UserCertificates } from 'src/views/users/UserPageViews/UserCertificates.tsx'
import { UserGastronomy } from 'src/views/users/UserPageViews/UserGastronomy.tsx'

const UserPage = () => {
  const { id } = useParams()
  const [user, setUser] = useState<IUserFull>()
  const [preferences, setPreferences] = useState<IUserPreferences>()
  const [bookings, setBookings] = useState<IBookingWithRestaurant[]>([])
  const [events, setEvents] = useState<IEventBookingBase[]>([])
  const [logs, setLogs] = useState<ILogs[]>([])

  useEffect(() => {
    getUserById(Number(id)).then((res) => setUser(res.data))
    getUserPreferences(Number(id)).then((res) => setPreferences(res.data))
    getUserBookings(Number(id)).then((res) => setBookings(res.data))
    getUserLogs(Number(id)).then((res) => setLogs(res.data))
    getUserEvents(Number(id)).then((res) => setEvents(res.data))
  }, [])

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
                <CCard className={classNames(css.w100)}>
                  <CCardHeader>
                    <strong>Информация</strong>
                  </CCardHeader>
                  <CCardBody>
                    <CTabs defaultActiveItemKey="home">
                      <CTabList variant="tabs">
                        <CTab itemKey="home">Профиль</CTab>
                        <CTab itemKey="bookings">Бронирование</CTab>
                        <CTab itemKey="events">Мероприятия</CTab>
                        <CTab itemKey="banquets">Банкеты</CTab>
                        <CTab itemKey="certificates">Сертификаты</CTab>
                        <CTab itemKey="gastronomy">Кулинария</CTab>
                        <CTab itemKey="logs">Логи</CTab>
                        <CTab itemKey="reviews">Отзывы</CTab>
                        <CTab itemKey="payments">Платежи</CTab>
                      </CTabList>
                      <CTabContent>
                        <CTabPanel className="p-3" itemKey="home">
                          {user && preferences && (
                            <UserProfile user={user} preferences={preferences} />
                          )}
                        </CTabPanel>
                        <CTabPanel className="p-3" itemKey="bookings">
                          <UserBookings bookings={bookings} />
                        </CTabPanel>
                        <CTabPanel className="p-3" itemKey="events">
                          <UserEvents events={events} />
                        </CTabPanel>
                        <CTabPanel itemKey="banquets">
                          <UserBanquets user_id={Number(id)} />
                        </CTabPanel>
                        <CTabPanel className="p-3" itemKey="certificates">
                          <UserCertificates user_id={Number(id)} />
                        </CTabPanel>
                        <CTabPanel className="p-3" itemKey="gastronomy">
                          <UserGastronomy user_id={Number(id)} />
                        </CTabPanel>
                        <CTabPanel className="p-3" itemKey="logs">
                          <UserLogs logs={logs} />
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
