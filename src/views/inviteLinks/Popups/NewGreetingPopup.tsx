import {
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CButton,
  CCard,
} from '@coreui/react-pro'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import { TextEditor } from 'src/components/TextEditor/TextEditor.tsx'

const NewGreetingPopup: FC<{
  popup: [boolean, Dispatch<SetStateAction<boolean>>]
}> = ({ popup }) => {
  const [isActivePopup, setActivePopup] = popup
  const [, setEditorContent] = useState<string>('')
  return (
    <CModal
      size="lg"
      alignment="center"
      visible={isActivePopup}
      onClose={() => setActivePopup(false)}
    >
      <CModalHeader>
        <CModalTitle>Дефолтное приветствие</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CCard>
          <TextEditor onUpdate={setEditorContent} initialContent="Приветственный текст" />
        </CCard>
      </CModalBody>
      <CModalFooter className="flex-nowrap">
        <CButton color="secondary" className="w-100" onClick={() => setActivePopup(false)}>
          Отменить
        </CButton>
        <CButton color="primary" className="w-100">
          Сохранить
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default NewGreetingPopup
