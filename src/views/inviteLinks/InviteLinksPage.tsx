import { CButton, CCard, CCardBody, CCardHeader } from '@coreui/react-pro'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { getCodes } from 'src/dataProviders/codes'
import { ICode } from 'src/types/Code'
import InviteLinksTable from 'src/views/inviteLinks/inviteLinksTable.tsx'

const InviteLinksPage = () => {
  const [links, setLinks] = useState<ICode[]>([])
  const loadLinks = async () => {
    const response = await getCodes()
    setLinks([...response.data].sort((a, b) => a.id - b.id))
  }

  useEffect(() => {
    loadLinks()
  }, [])
  return (
    <CCard className="border-0">
      <CCardHeader
        className={classNames('d-flex', 'justify-content-between', 'align-items-center')}
      >
        <strong>Инвайт-ссылки</strong>
        <div className={classNames('d-flex', 'gap-2')}>
          <CButton color="primary">+ Новая ссылка</CButton>
          <CButton color="primary">Дефолтное приветствие</CButton>
        </div>
      </CCardHeader>
      <CCardBody className="pt-0">
        <InviteLinksTable links={links} />
      </CCardBody>
    </CCard>
  )
}

export default InviteLinksPage
