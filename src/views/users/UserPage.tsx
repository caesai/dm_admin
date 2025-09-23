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
  // CTabPanel,
  CTabs,
} from '@coreui/react-pro'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { IUserFull } from 'src/types/User.ts'
import {
  getUserBookings,
  getUserById,
  getUserEvents,
  getUserLogs,
} from 'src/dataProviders/users.ts'
import css from '../style/layout.module.css'
import classNames from 'classnames'
import { IAdmin } from 'src/types/Admin.ts'
import { getAdmins } from 'src/dataProviders/admins.ts'
import { UserEdit } from 'src/views/users/UserPageViews/UserEdit.tsx'
import { UserBookings } from 'src/views/users/UserPageViews/UserBookings.tsx'
import { IBookingWithRestaurant } from 'src/types/Booking.ts'
import { UserLogs } from 'src/views/users/UserPageViews/UserLogs.tsx'
import { ILogs } from 'src/types/Logs.ts'

const UserPage = () => {
  const { id } = useParams()
  const [user, setUser] = useState<IUserFull>()
  const [bookings, setBookings] = useState<IBookingWithRestaurant[]>([])
  const [logs, setLogs] = useState<ILogs[]>([])
  const [adminList, setAdminList] = useState<IAdmin[]>([])

  useEffect(() => {
    getUserById(Number(id)).then((res) => setUser(res.data))
    getUserBookings(Number(id)).then((res) => setBookings(res.data))
    getUserLogs(Number(id)).then((res) => setLogs(res.data))
    getUserEvents(Number(id)).then((res) => console.log('events:', res.data))
    getAdmins().then((res) => setAdminList(res.data))
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
                        <CTab itemKey="logs">Логи</CTab>
                        <CTab itemKey={'reviews'}>Отзывы</CTab>
                        <CTab itemKey={'payments'}>Платежи</CTab>
                      </CTabList>
                      <CTabContent>
                        <CTabPanel className="p-3" itemKey="home">
                          <UserEdit userData={[user, setUser]} admins={[adminList, setAdminList]} />
                        </CTabPanel>
                        <CTabPanel className="p-3" itemKey="bookings">
                          <UserBookings bookings={bookings} />
                        </CTabPanel>
                        {/*<CTabPanel className="p-3" itemKey="events">*/}
                        {/*  <UserEvents user={user} />*/}
                        {/*</CTabPanel>*/}
                        <CTabPanel className="p-3" itemKey="logs">
                          <UserLogs logs={logs} />
                        </CTabPanel>
                        {/*<CTabPanel className="p-3" itemKey="reviews">*/}
                        {/*  <UserReviews user={user} />*/}
                        {/*</CTabPanel>*/}
                        {/*<CTabPanel className="p-3" itemKey="payments">*/}
                        {/*  <UserPayments user={user} />*/}
                        {/*</CTabPanel>*/}
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
