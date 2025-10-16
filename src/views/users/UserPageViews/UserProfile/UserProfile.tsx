import { IUserFull, IUserPreferences } from 'src/types/User.ts'
import { CContainer, CRow, CCol, CCard, CCardBody, CBadge } from '@coreui/react-pro'
import { useUserStats } from 'src/hooks/useUserStats.ts'
import { UserProfileHeader } from './UserProfileHeader.tsx'
import { UserPreferences } from './UserPreferences.tsx'
import { UserTags } from './UserTags'
import { UserBookingsStats } from './UserBookingsStats'
import { UserCitiesStats } from './UserCitiesStats'
import { UserRestaurantsStats } from './UserRestaurantsStats'
import { UserCalendarStats } from './UserCalendarStats'
import { UserTimeStats } from './UserTimeStats'

interface Props {
  user: IUserFull
  preferences: IUserPreferences
}

export const UserProfile = ({ user, preferences }: Props) => {
  const {
    tagStats,
    bookingsWithKids,
    canceledBookings,
    visitedBookings,
    dayStats,
    timeStats,
    restaurants,
    cityStats,
    timeFromLastBooking,
    timeFromLastVisit,
  } = useUserStats(user)

  const hasBookings = user.bookings && user.bookings.length > 0

  return (
    <CContainer fluid>
      <CRow className="g-3 mb-4">
        <CCol md={4}>
          <UserProfileHeader user={user} />
        </CCol>
        <CCol md={8}>
          <CRow className="g-3 h-100">
            <CCol md={12} className="d-flex flex-column gap-3">
              {!user.mailing_enabled && (
                <CCard className="h-25">
                  <CCardBody className="d-flex align-items-center justify-content-center">
                    <div className="text-center">
                      <CBadge className="fs-6">Пользователь заблокировал бота</CBadge>
                    </div>
                  </CCardBody>
                </CCard>
              )}
              <UserPreferences preferences={preferences} />
            </CCol>
          </CRow>
        </CCol>
      </CRow>
      {hasBookings && (
        <CRow className="g-3">
          <CCol md={4}>
            <UserTags tagStats={tagStats} />
          </CCol>
          <CCol md={4}>
            <UserBookingsStats
              user={user}
              bookingsWithKids={bookingsWithKids}
              canceledBookings={canceledBookings}
              visitedBookings={visitedBookings}
            />
          </CCol>
          <CCol md={4}>
            <UserCitiesStats cityStats={cityStats} />
          </CCol>
          <CCol md={4}>
            <UserRestaurantsStats restaurants={restaurants} />
          </CCol>
          <CCol md={4}>
            <UserCalendarStats dayStats={dayStats} timeStats={timeStats} />
          </CCol>
          <CCol md={4}>
            <UserTimeStats
              timeFromLastBooking={timeFromLastBooking}
              timeFromLastVisit={timeFromLastVisit}
            />
          </CCol>
        </CRow>
      )}
    </CContainer>
  )
}
