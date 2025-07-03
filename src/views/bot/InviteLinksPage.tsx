import { CCard, CCardBody, CCardHeader, CSpinner } from '@coreui/react-pro'
import classNames from 'classnames'
import { useState } from 'react'

const InviteLinksPage = () => {
  const [loading, setLoading] = useState(true)

  if (loading) {
    return <CSpinner color={'primary'} />
  }

  return (
    <CCard>
      <CCardHeader>Invite Links Page</CCardHeader>
      <CCardBody className={classNames('d-flex', 'flex-row', 'gap-2')}>Hello</CCardBody>
    </CCard>
  )
}

export default InviteLinksPage
