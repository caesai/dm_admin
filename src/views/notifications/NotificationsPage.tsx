import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCardHeader,
  CForm,
  CFormInput,
  CImage,
  CInputGroup,
  CLoadingButton,
  CTab,
  CTabContent,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell, CTableRow,
  CTabList,
  CTabPanel,
  CTabs,
} from '@coreui/react-pro'
import classNames from 'classnames'
import { ChangeEvent, useState } from 'react'
import { TextEditor } from 'src/components/TextEditor/TextEditor.tsx'
import { sendMailing } from 'src/dataProviders/mailing.ts'

const NotificationsPage = () => {
  const [testUserName, setTestUserName] = useState<number | undefined>()
  const [editorContent, setEditorContent] = useState<any>(null)
  const [groupNotificationIsInProgress, setGroupNotificationIsInProgress] = useState(false)
  const [allNotificationIsInProgress, setAllNotificationIsInProgress] = useState(false)
  const [photo, setPhoto] = useState<File | null>(null)
  const [document, setDocument] = useState<File | null>(null)
  const [buttonText, setButtonText] = useState<string | undefined>()
  const [buttonUrl, setButtonUrl] = useState<string | undefined>()
  const getBase64 = (file: File) =>
    new Promise(function (resolve: (value: string) => void, reject) {
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(String(reader.result))
      reader.onerror = (error) => reject(error)
    })

  // Function to test notifications.
  // Examples of user ids: 115555014, 1283802964.
  const notifyGroup = async () => {
    try {
      setGroupNotificationIsInProgress(true)
      if (!testUserName) {
        console.log('No test user data provided')
        return
      }
      let photo64: string | null = null
      let doc64: string | null = null
      if (photo) {
        photo64 = await getBase64(photo);
      }
      if (document) {
        doc64 = await getBase64(document);
      }

      const res = await sendMailing(
        [testUserName],
        editorContent,
        photo64,
        doc64,
        buttonText,
        buttonUrl,
      )
      console.log('Notification sent successfully:', res)
    } catch (error) {
      console.error('Error in test notification:', error)
    } finally {
      // Reset test username after sending notification
      setTestUserName(undefined)
      setButtonUrl(undefined)
      setButtonText(undefined)
      setDocument(null)
      setPhoto(null)
      setGroupNotificationIsInProgress(false)
    }
  }

  // Notify all users
  const notifyAll = async () => {
    try {
      setAllNotificationIsInProgress(true)
      const res = await sendMailing([], editorContent, null, null, undefined, undefined)
      console.log('Notification sent successfully:', res)
    } catch (error) {
      console.error('Error in test notification:', error)
    } finally {
      setButtonUrl(undefined)
      setButtonText(undefined)
      setDocument(null)
      setPhoto(null)
      setAllNotificationIsInProgress(false)
    }
  }

  const handlePhoto = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhoto(e.target.files[0])
    }
  }

  const handleDocument = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setDocument(e.target.files[0])
    }
  }

  return (
    <CCard className={classNames('border-0', 'bg-transparent')}>
      <CTabs defaultActiveItemKey="distribution">
        <CCardHeader className="bg-white">
          <CTabList variant="enclosed">
            <CTab itemKey="distribution">Рассылка</CTab>
            <CTab itemKey="reservation">Бронирование</CTab>
          </CTabList>
        </CCardHeader>
        <CTabContent>
          <CTabPanel itemKey="distribution">
            <CCard className={classNames('mb-4', 'border-0')}>
              <CCardBody>
                <CCardGroup className="flex-column">
                  <CCardBody className={classNames('d-flex', 'flex-row', 'gap-2')}>
                    <TextEditor onUpdate={setEditorContent} />
                  </CCardBody>
                  <CCardBody className="d-flex">
                    <CLoadingButton
                      color="primary"
                      className="px-4"
                      loading={allNotificationIsInProgress}
                      onClick={notifyAll}
                    >
                      Рассылка
                    </CLoadingButton>
                  </CCardBody>
                </CCardGroup>
              </CCardBody>
            </CCard>
            <CCard className="mb-4">
              <CCardHeader>Вложения</CCardHeader>
              <CCardBody>
                {photo && (
                  <CImage rounded thumbnail src={URL.createObjectURL(photo)} width={200} height={200} />
                )}
                <CForm className="flex-column gap-4" style={{ display: 'flex' }}>
                  <CFormInput
                    type="file"
                    label="Изображение"
                    onChange={handlePhoto}
                  />
                  <CFormInput
                    type="file"
                    label="Документ"
                    onChange={handleDocument}
                  />
                </CForm>
              </CCardBody>
            </CCard>
            <CCard className="mb-4">
              <CCardHeader>Кнопка</CCardHeader>
              <CCardBody>
                <CForm className="flex-column gap-4" style={{ display: 'flex' }}>
                  <CFormInput
                    placeholder="Текст кнопки"
                    type="text"
                    value={buttonText}
                    onChange={(e) => setButtonText(e.target.value)}
                  />
                  <CFormInput
                    placeholder="Url кнопки"
                    type="text"
                    value={buttonUrl}
                    onChange={(e) => setButtonUrl(e.target.value)}
                  />
                </CForm>
              </CCardBody>
            </CCard>
            <CCard className="mb-4">
              <CCardHeader>Тест рассылки</CCardHeader>
              <CCardBody>
                <CForm>
                  <CInputGroup className="mb-3">
                    <CFormInput
                      placeholder="Telegram ID"
                      type="number"
                      value={testUserName ?? ''}
                      onChange={(e) => setTestUserName(e.target.value ? Number(e.target.value) : undefined)}
                    />
                  </CInputGroup>
                  <CLoadingButton
                    color="primary"
                    className="px-4"
                    loading={groupNotificationIsInProgress}
                    onClick={notifyGroup}
                  >
                    Тест
                  </CLoadingButton>
                </CForm>
              </CCardBody>
            </CCard>
          </CTabPanel>
          <CTabPanel itemKey="reservation" className={classNames('bg-white', 'p-3')}>
            <CTable striped className={classNames('align-middle', 'table-hover', 'mb-0')}>
              <CTableHead>
                <CTableHeaderCell className={classNames('text-start', 'pb-3')}>
                  Ресторан
                </CTableHeaderCell>
                <CTableHeaderCell className={classNames('text-center', 'pb-3')}>
                  Подтверждение
                </CTableHeaderCell>
                <CTableHeaderCell className={classNames('text-end', 'pe-2', 'pb-3')}>
                  Редактировать
                </CTableHeaderCell>
              </CTableHead>
              <CTableBody className={classNames('border-top')}>
                <CTableRow>
                  <CTableDataCell className="text-start">Lorem ipsum dolor sit amet.</CTableDataCell>
                  <CTableDataCell className="text-center">Lorem ipsum dolor sit amet.</CTableDataCell>
                  <CTableDataCell className={classNames('text-end', 'pe-0')}>
                    <CButton color={'primary'} onClick={console.log}>
                      Редактировать
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableDataCell className="text-start">Lorem ipsum dolor sit amet.</CTableDataCell>
                  <CTableDataCell className="text-center">Lorem ipsum dolor sit amet.</CTableDataCell>
                  <CTableDataCell className={classNames('text-end', 'pe-0')}>
                    <CButton color={'primary'} onClick={console.log}>
                      Редактировать
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          </CTabPanel>
        </CTabContent>
      </CTabs>
    </CCard>
  )
}

export default NotificationsPage
