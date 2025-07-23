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

const EditOtherPopup: FC<{
  popup: [number, Dispatch<SetStateAction<number | null>>]
  onUpdate?: () => Promise<void>
}> = ({ popup, onUpdate }) => {
  const [textId, setTextId] = popup
  const [editorContent, setEditorContent] = useState<string>('')
  const [text, setText] = useState<IText>()
  useEffect(() => {
    fetchText()
  }, [textId])
  const changeText = async () => {
    if (text) {
      await updateTextById(textId, {
        ...text,
        content: editorContent,
      })
      setTextId(null)
      if (onUpdate) {
        await onUpdate()
      }
    }
  }
  const fetchText = async () => {
    try {
      const response = await getTextById(textId)
      setText(response.data)
    } catch (error) {
      console.error('Failed to fetch text:', error)
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
            <CCardBody>{text?.name}</CCardBody>
          </CCard>
          <CCard className="border-0">
            <CCardBody className={classNames('border', 'rounded')}>
              <TextEditor onUpdate={setEditorContent} initialContent={text?.content} />
            </CCardBody>
          </CCard>
        </CCardGroup>
      </CModalBody>
      <CModalFooter className="flex-nowrap">
        <CButton color="secondary" className="w-100" onClick={() => setTextId(null)}>
          Отменить
        </CButton>
        <CButton color="primary" className="w-100" onClick={changeText}>
          Сохранить
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default EditOtherPopup
