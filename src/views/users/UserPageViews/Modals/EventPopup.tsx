import { CCard, CModal, CModalBody, CModalHeader, CModalTitle } from '@coreui/react-pro'
import classNames from 'classnames'
import { Dispatch, FC, SetStateAction } from 'react'
import { IEventBookingBase } from 'src/types/Event.ts'

export const EventPopup: FC<{
  event: [IEventBookingBase | null, Dispatch<SetStateAction<IEventBookingBase | null>>]
}> = ({ event }) => {
  const [currentEvent, setCurrentEvent] = event

  return (
    <CModal
      alignment="center"
      size="lg"
      visible={currentEvent !== null}
      onClose={() => setCurrentEvent(null)}
    >
      <CModalHeader>
        <CModalTitle>Мероприятия</CModalTitle>
      </CModalHeader>
      <CModalBody>
        {currentEvent !== null && (
          <CCard className={classNames('d-flex', 'flex-column', 'gap-1', 'border-0')}>
            <div className={classNames('d-flex', 'gap-2')}>
              <span>event_name:</span>
              <span>{currentEvent.event_name}</span>
            </div>
            <div className={classNames('d-flex', 'gap-2')}>
              <span>restaurant_name:</span>
              <span>{currentEvent.restaurant_name}</span>
            </div>
            <div className={classNames('d-flex', 'gap-2')}>
              <span>restaurant_id:</span>
              <span>{currentEvent.restaurant_id}</span>
            </div>
            <div className={classNames('d-flex', 'gap-2')}>
              <span>event_date:</span>
              <span>{currentEvent.event_date}</span>
            </div>
            <div className={classNames('d-flex', 'gap-2')}>
              <span>guests_count:</span>
              <span>{currentEvent.guests_count}</span>
            </div>
            <div className={classNames('d-flex', 'gap-2')}>
              <span>payment_status:</span>
              <span>{currentEvent.payment_status}</span>
            </div>
            <div className={classNames('d-flex', 'gap-2')}>
              <span>payment_sum:</span>
              <span>{currentEvent.payment_sum}</span>
            </div>
            <div className={classNames('d-flex', 'gap-2')}>
              <span>created_at:</span>
              <span>{currentEvent.created_at}</span>
            </div>
          </CCard>
        )}
      </CModalBody>
    </CModal>
  )
}
