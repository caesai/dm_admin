import { CCard, CCardBody } from '@coreui/react-pro'
import classNames from 'classnames'

interface Props {
  timeFromLastBooking: string | null
  timeFromLastVisit: string | null
}

export const UserTimeStats = ({ timeFromLastBooking, timeFromLastVisit }: Props) => {
  if (!timeFromLastBooking) return null

  return (
    <CCard className="border h-100">
      <CCardBody className={classNames('d-flex', 'flex-column', 'justify-content-center', 'gap-2')}>
        <div className={classNames('d-flex', 'flex-column', 'w-100', 'text-center')}>
          <h6 className="text-muted mb-2">Дней с последнего бронирования:</h6>
          <strong className="fs-5">{timeFromLastBooking}</strong>
        </div>
        {timeFromLastVisit && (
          <div className={classNames('d-flex', 'flex-column', 'w-100', 'text-center')}>
            <h6 className="text-muted mb-2">Дней с последнего визита:</h6>
            <strong className="fs-5">{timeFromLastVisit}</strong>
          </div>
        )}
      </CCardBody>
    </CCard>
  )
}
