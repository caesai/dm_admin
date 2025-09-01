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
import { ICode } from 'src/types/Code.ts'
import { createCode, getCodeById } from 'src/dataProviders/codes.ts'
import toast from 'react-hot-toast'

const InviteLinkPopup: FC<{
  popupId: [number | null | undefined, Dispatch<SetStateAction<number | null | undefined>>]
  onUpdate?: () => Promise<void>
}> = ({ popupId, onUpdate }) => {
  const [id, setId] = popupId
  const [editorContent, setEditorContent] = useState<string>('')
  const [code, setCode] = useState<ICode>({
    name: '',
    code: '',
    text: null,
    restaurant_id: null,
  })
  const fetchCode = async () => {
    try {
      if (id === null || id === undefined) return
      const response = await getCodeById(id)
      setCode(response.data)
    } catch (error) {
      console.error('Failed to fetch code:', error)
    }
  }

  const addNewCode = async () => {
    if (id !== null) return
    await createCode({
      ...code,
      text: editorContent,
    })
      .then(() => toast('Инвайт-ссылка создана'))
      .catch(() => toast.error('Ошибка при создании'))
      .finally(() => {
        setId(undefined)
        if (onUpdate) {
          onUpdate()
        }
      })
  }

  const changeLinkCode = (e: ChangeEvent<HTMLInputElement>) => {
    setCode((prev) => ({ ...prev, code: e.target.value }))
  }

  const changeLinkName = (e: ChangeEvent<HTMLInputElement>) => {
    setCode((prev) => ({ ...prev, name: e.target.value }))
  }

  useEffect(() => {
    fetchCode()
  }, [id])
  return (
    <CModal
      size="lg"
      alignment="center"
      visible={id !== undefined}
      onClose={() => setId(undefined)}
    >
      <CModalHeader>
        <CModalTitle>
          {id === null ? 'Добавление инвайт-ссылки' : 'Редактирование инвайт-ссылки'}
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CCardGroup className={classNames('flex-column', 'gap-2')}>
          <CCard className="border-0">
            <CFormInput
              placeholder="Код-ссылки"
              defaultValue={code?.code}
              onInput={changeLinkCode}
            />
          </CCard>
          <CCard className="border-0">
            <CFormInput
              placeholder="Имя ссылки"
              defaultValue={code?.name}
              onInput={changeLinkName}
            />
          </CCard>
          <CCard className="border-0">
            <CFormSelect options={[{ label: 'Ресторан' }]} />
          </CCard>
          <CCard className="border-0">
            <CCardBody className={classNames('border', 'rounded')}>
              <TextEditor
                onUpdate={setEditorContent}
                initialContent={code?.text ?? 'Приветственный текст'}
              />
            </CCardBody>
          </CCard>
        </CCardGroup>
      </CModalBody>
      <CModalFooter className="flex-nowrap">
        <CButton color="secondary" className="w-100" onClick={() => setId(undefined)}>
          {id === null ? 'Отменить' : 'Удалить'}
        </CButton>
        <CButton color="primary" className="w-100" onClick={addNewCode}>
          {id === null ? 'Добавить' : 'Сохранить'}
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default InviteLinkPopup
