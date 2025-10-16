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
            {Object.keys(currentBooking).map((key, index) => (
              <div className={classNames('d-flex', 'gap-2')} key={index}>
                <span>
                  <strong>{key}:</strong>
                </span>
                <span>
                  {(() => {
                    const value = currentBooking[key as keyof IBookingWithRestaurant]
                    if (value === null || value === undefined) return ''
                    if (typeof value === 'object') return JSON.stringify(value)
                    return value as string | number | boolean
                  })()}
                </span>
              </div>
            ))}
          </CCard>
        )}
      </CModalBody>
    </CModal>
  )
}
