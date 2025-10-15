import { IUserFull } from 'src/types/User.ts'
import { CCard, CCardBody, CCardHeader, CCardTitle } from '@coreui/react-pro'
import classNames from 'classnames'

interface Props {
  user: IUserFull
  bookingsWithKids: number
  canceledBookings: number
  visitedBookings: number
}

export const UserBookingsStats = ({
  user,
  bookingsWithKids,
  canceledBookings,
  visitedBookings,
}: Props) => {
  const hasBookings = user.bookings && user.bookings.length > 0

  return (
    <CCard className="border h-100">
      <CCardHeader>
        <CCardTitle className="mb-0">Бронирования</CCardTitle>
      </CCardHeader>
      <CCardBody>
        {hasBookings ? (
          <div className="d-grid gap-2">
            <StatItem label="Общее количество:" value={user.total_bookings} />
            <StatItem label="С детьми:" value={bookingsWithKids} />
            <StatItem label="Отмененных:" value={canceledBookings} />
            <StatItem label="Визитов:" value={visitedBookings} />
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
  )
}

const StatItem = ({ label, value }: { label: string; value?: number }) => (
  <span className="d-flex align-items-center justify-content-between">
    <strong>{label}</strong> {value}
  </span>
)
