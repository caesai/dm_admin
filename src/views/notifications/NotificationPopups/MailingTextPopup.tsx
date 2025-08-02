import { CModal, CModalBody, CModalHeader, CModalTitle } from '@coreui/react-pro'
import { Dispatch, FC, SetStateAction } from 'react'

const MailingTextPopup: FC<{
  popup: [string, Dispatch<SetStateAction<string | null>>]
}> = ({ popup }) => {
  const [text, setText] = popup

  return (
    <CModal size="lg" alignment="center" visible={text !== null} onClose={() => setText(null)}>
      <CModalHeader>
        <CModalTitle>Текст рассылки</CModalTitle>
      </CModalHeader>
      <CModalBody>{text}</CModalBody>
    </CModal>
  )
}

export default MailingTextPopup
