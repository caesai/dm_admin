import {
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CButton,
  CCard,
} from '@coreui/react-pro'
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { TextEditor } from 'src/components/TextEditor/TextEditor.tsx'
import { getTextByName, updateTextByName } from 'src/dataProviders/texts.ts'
import toast from 'react-hot-toast'

export interface IGreeting {
  name: string
  content: string
}

const NewGreetingPopup: FC<{
  popup: [boolean, Dispatch<SetStateAction<boolean>>]
}> = ({ popup }) => {
  const [isActivePopup, setActivePopup] = popup
  const [editorContent, setEditorContent] = useState<string>('')
  const [text, setText] = useState<IGreeting>({
    name: 'start_default',
    content: '',
  })

  const loadTexts = async () => {
    const response = await getTextByName('start_default')
    setText(response.data)
    setEditorContent(response.data.content)
  }

  const updateText = async () => {
    await updateTextByName('start_default', {
      ...text,
      content: editorContent,
    })
      .then(() => toast.success('Приветствие обновлено'))
      .catch(() => toast.error('Ошибка обновления'))
      .finally(() => setActivePopup(false))
  }

  useEffect(() => {
    loadTexts()
  }, [])
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
          <TextEditor
            onUpdate={setEditorContent}
            initialContent={editorContent === '' ? 'Приветственный текст' : editorContent}
          />
        </CCard>
      </CModalBody>
      <CModalFooter className="flex-nowrap">
        <CButton color="secondary" className="w-100" onClick={() => setActivePopup(false)}>
          Отменить
        </CButton>
        <CButton color="primary" className="w-100" onClick={updateText}>
          Сохранить
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default NewGreetingPopup
