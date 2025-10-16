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
            {Object.keys(currentEvent).map((key, index) => (
              <div className={classNames('d-flex', 'gap-2')} key={index}>
                <span>
                  <strong>{key}:</strong>
                </span>
                <span>{currentEvent[key as keyof IEventBookingBase]}</span>
              </div>
            ))}
          </CCard>
        )}
      </CModalBody>
    </CModal>
  )
}
