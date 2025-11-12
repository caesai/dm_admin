import { FC } from 'react'
import { CTabPanel } from '@coreui/react-pro'
import classNames from 'classnames'

const BookingsPanel: FC = () => {
  return (
    <CTabPanel itemKey={'bookings'} className={classNames('d-flex', 'flex-column', 'gap-4')}>
      <div>booking</div>
    </CTabPanel>
  )
}

export default BookingsPanel
