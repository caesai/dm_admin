import {
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CButton,
  CCardGroup,
  CCard,
  CCardBody,
} from '@coreui/react-pro'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import classNames from 'classnames'
import { TextEditor } from 'src/components/TextEditor/TextEditor.tsx'

const EditReservationPopup: FC<{
  popup: [boolean, Dispatch<SetStateAction<boolean>>]
}> = ({ popup }) => {
  const [open, setOpen] = popup
  const [editorContent, setEditorContent] = useState<any>(null)
  return (
    <CModal size="lg" alignment="center" visible={open} onClose={() => setOpen(false)}>
      <CModalHeader>
        <CModalTitle>Подтверждение бронирования</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CCardGroup className={classNames('flex-column', 'gap-2')}>
          <CCard>
            <CCardBody>Smoke BBQ CПб</CCardBody>
          </CCard>
          <CCard className="border-0">
            <CCardBody className={classNames('border', 'rounded')}>
              <TextEditor onUpdate={setEditorContent} />
            </CCardBody>
          </CCard>
        </CCardGroup>
      </CModalBody>
      <CModalFooter className="flex-nowrap">
        <CButton color="secondary" className="w-100" onClick={() => setOpen(false)}>
          Отменить
        </CButton>
        <CButton color="primary" className="w-100">
          Сохранить
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default EditReservationPopup
