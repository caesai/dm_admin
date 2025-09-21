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
  CFormInput,
  CFormSelect,
} from '@coreui/react-pro'
import { ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import classNames from 'classnames'
import { TextEditor } from 'src/components/TextEditor/TextEditor.tsx'
import { IText, ITextInitial } from 'src/types/Texts.ts'
import { getTextById, updateTextById } from 'src/dataProviders/texts.ts'

export const categoryOptions = [
  { label: 'BOOKING', value: 'BOOKING' },
  { label: 'SUPPORT', value: 'SUPPORT' },
  { label: 'EVENT', value: 'EVENT' },
  { label: 'TRIGGER_MAILING', value: 'TRIGGER_MAILING' },
]

export const typeOptions = [
  { label: 'В ресторан', value: 'В ресторан' },
  { label: 'Пользователю', value: 'Пользователю' },
  { label: 'В ремаркед', value: 'В ремаркед' },
]

const EditOtherPopup: FC<{
  popup: [number, Dispatch<SetStateAction<number | null>>]
  onUpdate?: () => Promise<void>
}> = ({ popup, onUpdate }) => {
  const [textId, setTextId] = popup
  const [editorContent, setEditorContent] = useState<string>('')
  const [text, setText] = useState<IText>(ITextInitial)

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

  const changeDescription = (e: ChangeEvent<HTMLInputElement>) => {
    setText((prev) => ({
      ...prev,
      description: e.target.value,
    }))
  }

  const changeCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    setText((prev) => ({
      ...prev,
      category: e.target.value,
    }))
  }

  const changeType = (e: ChangeEvent<HTMLSelectElement>) => {
    setText((prev) => ({
      ...prev,
      type: e.target.value,
    }))
  }

  const fetchText = async () => {
    try {
      const response = await getTextById(textId)
      setText(response.data)
      setEditorContent(response.data.content)
    } catch (error) {
      console.error('Failed to fetch text:', error)
    }
  }

  useEffect(() => {
    fetchText()
  }, [textId])

  return (
    <CModal size="lg" alignment="center" visible={textId !== null} onClose={() => setTextId(null)}>
      <CModalHeader>
        <CModalTitle>Редактирование текста</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CCardGroup className={classNames('flex-column', 'gap-2')}>
          <CCard className="border-0">
            <CFormInput
              placeholder="Описание"
              value={text.description}
              onInput={changeDescription}
              className="py-2"
            />
          </CCard>
          <CCard className="border-0">
            <CFormSelect
              value={text.category}
              onChange={changeCategory}
              options={categoryOptions}
            />
          </CCard>
          <CCard className="border-0">
            <CFormSelect value={text.type} onChange={changeType} options={typeOptions} />
          </CCard>
          <CCard className="border-0">
            <CCardBody className={classNames('border', 'rounded')}>
              <TextEditor
                onUpdate={setEditorContent}
                initialContent={text?.content ? text.content : 'Текст рассылки...'}
              />
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
