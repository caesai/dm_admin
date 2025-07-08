import { CCard, CCardBody, CCardHeader, CSpinner } from '@coreui/react-pro'
import classNames from 'classnames'
import { useState } from 'react'

const NotificationsPage = () => {
  const [loading, setLoading] = useState(true)

  if (loading) {
    return <CSpinner color={'primary'} />
  }

  return (
    <CCard>
      <CCardHeader>Notifications Page</CCardHeader>
      <CCardBody className={classNames('d-flex', 'flex-row', 'gap-2')}>Hello</CCardBody>
    </CCard>
  )
}

export default NotificationsPage
