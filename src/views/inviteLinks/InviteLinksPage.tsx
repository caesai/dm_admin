import { CButton, CCard, CCardBody, CCardHeader } from '@coreui/react-pro'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { getCodesList } from 'src/dataProviders/codes'
import { ICode } from 'src/types/Code'
import InviteLinksTable from 'src/views/inviteLinks/Tables/inviteLinksTable.tsx'
import InviteLinkPopup from 'src/views/inviteLinks/Popups/InviteLinkPopup.tsx'

const InviteLinksPage = () => {
  const [links, setLinks] = useState<ICode[]>([])
  const [currentCodeId, setCurrentCodeId] = useState<number | null | undefined>(undefined)
  const loadLinks = async () => {
    const response = await getCodesList()
    setLinks([...response.data].sort((a, b) => a.id - b.id))
  }

  useEffect(() => {
    loadLinks()
  }, [])
  return (
    <>
      <CCard className="border-0">
        <CCardHeader
          className={classNames('d-flex', 'justify-content-between', 'align-items-center')}
        >
          <strong>Инвайт-ссылки</strong>
          <div className={classNames('d-flex', 'gap-2')}>
            <CButton color="primary" onClick={() => setCurrentCodeId(null)}>
              + Новая ссылка
            </CButton>
            <CButton color="primary">Дефолтное приветствие</CButton>
          </div>
        </CCardHeader>
        <CCardBody className="pt-0">
          <InviteLinksTable links={links} setPopupId={setCurrentCodeId} />
        </CCardBody>
      </CCard>
      {currentCodeId !== undefined && (
        <InviteLinkPopup popupId={[currentCodeId, setCurrentCodeId]} onUpdate={loadLinks} />
      )}
    </>
  )
}

export default InviteLinksPage
