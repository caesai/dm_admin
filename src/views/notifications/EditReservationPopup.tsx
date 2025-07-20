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
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import classNames from 'classnames'
import { TextEditor } from 'src/components/TextEditor/TextEditor.tsx'
import { IText } from 'src/types/Texts.ts'
import { getTextById, updateTextById } from 'src/dataProviders/texts.ts'

const EditReservationPopup: FC<{
  popup: [number, Dispatch<SetStateAction<number | null>>]
  onUpdate?: () => Promise<void>
}> = ({ popup, onUpdate }) => {
  const [textId, setTextId] = popup
  const [editorContent, setEditorContent] = useState<string>('')
  const [reservation, setReservation] = useState<IText>()
  useEffect(() => {
    getTextById(textId)
      .then((d) => setReservation(d.data))
      .then(() => setEditorContent(reservation ? reservation.content : ''))
  }, [])
  const changeReservation = async () => {
    if (reservation) {
      await updateTextById(textId, {
        ...reservation,
        content: editorContent,
      })
      setTextId(null)
      if (onUpdate) {
        await onUpdate()
      }
    }
  }
  return (
    <CModal size="lg" alignment="center" visible={textId !== null} onClose={() => setTextId(null)}>
      <CModalHeader>
        <CModalTitle>Подтверждение бронирования</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CCardGroup className={classNames('flex-column', 'gap-2')}>
          <CCard>
            <CCardBody>{reservation?.name}</CCardBody>
          </CCard>
          <CCard className="border-0">
            <CCardBody className={classNames('border', 'rounded')}>
              <TextEditor onUpdate={setEditorContent} />
            </CCardBody>
          </CCard>
        </CCardGroup>
      </CModalBody>
      <CModalFooter className="flex-nowrap">
        <CButton color="secondary" className="w-100" onClick={() => setTextId(null)}>
          Отменить
        </CButton>
        <CButton color="primary" className="w-100" onClick={changeReservation}>
          Сохранить
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default EditReservationPopup
