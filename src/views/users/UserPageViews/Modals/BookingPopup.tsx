import { CCard, CModal, CModalBody, CModalHeader, CModalTitle } from '@coreui/react-pro'
import classNames from 'classnames'
import { IBookingWithRestaurant } from 'src/types/Booking.ts'
import { Dispatch, FC, SetStateAction } from 'react'

export const BookingPopup: FC<{
  booking: [IBookingWithRestaurant | null, Dispatch<SetStateAction<IBookingWithRestaurant | null>>]
}> = ({ booking }) => {
  const [currentBooking, setCurrentBooking] = booking

  return (
    <CModal
      alignment="center"
      size="lg"
      visible={currentBooking !== null}
      onClose={() => setCurrentBooking(null)}
    >
      <CModalHeader>
        <CModalTitle>Бронирование</CModalTitle>
      </CModalHeader>
      <CModalBody>
        {currentBooking !== null && (
          <CCard className={classNames('d-flex', 'flex-column', 'gap-1', 'border-0')}>
            <div className={classNames('d-flex', 'gap-2')}>
              <span>booking_date:</span>
              <span>{currentBooking.booking_date}</span>
            </div>
            <div className={classNames('d-flex', 'gap-2')}>
              <span>booking_status:</span>
              <span>{currentBooking.booking_status}</span>
            </div>
            <div className={classNames('d-flex', 'gap-2')}>
              <span>booking_type:</span>
              <span>{currentBooking.booking_type}</span>
            </div>
            <div className={classNames('d-flex', 'gap-2')}>
              <span>cancel_reason:</span>
              <span>{currentBooking.cancel_reason}</span>
            </div>
            <div className={classNames('d-flex', 'gap-2')}>
              <span>children_count:</span>
              <span>{currentBooking.children_count}</span>
            </div>
            <div className={classNames('d-flex', 'gap-2')}>
              <span>created_at:</span>
              <span>{currentBooking.created_at}</span>
            </div>
            <div className={classNames('d-flex', 'gap-2')}>
              <span>deposit_status:</span>
              <span>{currentBooking.deposit_status}</span>
            </div>
            <div className={classNames('d-flex', 'gap-2')}>
              <span>deposit_sum:</span>
              <span>{currentBooking.deposit_sum}</span>
            </div>
            <div className={classNames('d-flex', 'gap-2')}>
              <span>duration:</span>
              <span>{currentBooking.duration}</span>
            </div>
            <div className={classNames('d-flex', 'gap-2')}>
              <span>email:</span>
              <span>{currentBooking.email}</span>
            </div>
            <div className={classNames('d-flex', 'gap-2')}>
              <span>event_tags:</span>
              <span>{currentBooking.event_tags}</span>
            </div>
            <div className={classNames('d-flex', 'gap-2')}>
              <span>guests_count:</span>
              <span>{currentBooking.guests_count}</span>
            </div>
            <div className={classNames('d-flex', 'gap-2')}>
              <span>id:</span>
              <span>{currentBooking.id}</span>
            </div>
            <div className={classNames('d-flex', 'gap-2')}>
              <span>name:</span>
              <span>{currentBooking.name}</span>
            </div>
            <div className={classNames('d-flex', 'gap-2')}>
              <span>phone:</span>
              <span>{currentBooking.phone}</span>
            </div>
            <div className={classNames('d-flex', 'align--center', 'gap-2')}>
              <span>remarked_comment:</span>
              <span>{currentBooking.remarked_comment}</span>
            </div>
            <div className={classNames('d-flex', 'gap-2')}>
              <span>remarked_id:</span>
              <span>{currentBooking.remarked_id}</span>
            </div>
            <div className={classNames('d-flex', 'gap-2')}>
              <span>remind_sent:</span>
              <span>{currentBooking.remind_sent}</span>
            </div>
            <div className={classNames('d-flex', 'gap-2')}>
              <span>request_id:</span>
              <span>{currentBooking.request_id}</span>
            </div>
            <div className={classNames('d-flex', 'gap-2')}>
              <span>restaurant_id:</span>
              <span>{currentBooking.restaurant_id}</span>
            </div>
            <div className={classNames('d-flex', 'gap-2')}>
              <span>restaurant_name:</span>
              <span>{currentBooking.restaurant_name}</span>
            </div>
            <div className={classNames('d-flex', 'gap-2')}>
              <span>review_request_sent:</span>
              <span>{currentBooking.review_request_sent}</span>
            </div>
            <div className={classNames('d-flex', 'gap-2')}>
              <span>review_sent:</span>
              <span>{currentBooking.review_sent}</span>
            </div>
            <div className={classNames('d-flex', 'gap-2')}>
              <span>table_ids:</span>
              <span>{currentBooking.table_ids}</span>
            </div>
            <div className={classNames('d-flex', 'gap-2')}>
              <span>tags:</span>
              <span>{currentBooking.tags}</span>
            </div>
            <div className={classNames('d-flex', 'gap-2')}>
              <span>time:</span>
              <span>{currentBooking.time}</span>
            </div>
            <div className={classNames('d-flex', 'gap-2')}>
              <span>updated_at:</span>
              <span>{currentBooking.updated_at}</span>
            </div>
            <div className={classNames('d-flex', 'gap-2')}>
              <span>user_comments:</span>
              <span>{currentBooking.user_comments}</span>
            </div>
          </CCard>
        )}
      </CModalBody>
    </CModal>
  )
}
