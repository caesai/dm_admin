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
  CTabPanel,
} from '@coreui/react-pro'
import classNames from 'classnames'
import { TextEditor } from 'src/components/TextEditor/TextEditor.tsx'
import { ChangeEvent, useState } from 'react'
import ConfirmDistributionPopup from 'src/views/notifications/NotificationPopups/ConfirmDistributionPopup.tsx'
import {
  sendMailingDocument,
  sendMailingPhoto,
  sendMailingText,
  sendMailingVideo,
  // sendMailingVideo,
} from 'src/dataProviders/mailing.ts'

const DistributionPanel = () => {
  const [testUserName, setTestUserName] = useState<string | undefined>()
  const [editorContent, setEditorContent] = useState<any>(null)
  const [groupNotificationIsInProgress, setGroupNotificationIsInProgress] = useState(false)
  const [photo, setPhoto] = useState<File | null>(null)
  const [video, setVideo] = useState<File | null>(null)
  const [document, setDocument] = useState<File | null>(null)
  const [buttonText, setButtonText] = useState<string | undefined>()
  const [buttonUrl, setButtonUrl] = useState<string | undefined>()
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const sendMailing = async (
    users_ids: string | null,
    text: string,
    photoFile: File | null,
    videoFile: File | null,
    documentFile: File | null,
    button_text: string | undefined,
    button_url: string | undefined,
  ) => {
    try {
      if (photoFile !== null) {
        await sendMailingPhoto(photoFile, text, button_text, button_url, users_ids)
      } else if (documentFile !== null) {
        await sendMailingDocument(documentFile, text, button_text, button_url, users_ids)
      } else if (videoFile !== null) {
        await sendMailingVideo(videoFile, text, button_text, button_url, users_ids)
      } else {
        await sendMailingText(text, button_text, button_url, users_ids)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // Function to test notifications.
  // Examples of user ids: 115555014, 1283802964.
  const notifyGroup = async () => {
    try {
      setGroupNotificationIsInProgress(true)
      if (!testUserName) {
        console.log('No test user data provided')
        return
      }
      if (!editorContent) {
        console.log('No content to send')
        return
      }

      const res = await sendMailing(
        testUserName,
        editorContent,
        photo,
        video,
        document,
        buttonText,
        buttonUrl,
      )
      console.log('Notification sent successfully:', res)
    } catch (error) {
      console.error('Error in test notification:', error)
    } finally {
      setGroupNotificationIsInProgress(false)
    }
  }
  // Notify all users
  const notifyAll = async () => {
    try {
      const res = await sendMailing(null, editorContent, null, null, null, undefined, undefined)
      console.log('Notification sent successfully:', res)
    } catch (error) {
      console.error('Error in test notification:', error)
    } finally {
    }
  }

  const handlePhoto = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhoto(e.target.files[0])
    }
  }

  const handleVideo = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setVideo(e.target.files[0])
    }
  }

  const handleDocument = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setDocument(e.target.files[0])
    }
  }
  return (
    <>
      <CTabPanel itemKey="distribution">
        <CCard className={classNames('mb-4', 'border-0')}>
          <CCardBody>
            <CCardGroup className="flex-column">
              <CCardBody className={classNames('d-flex', 'flex-row', 'gap-2')}>
                <TextEditor onUpdate={setEditorContent} />
              </CCardBody>
              <CCardBody className="d-flex">
                <CButton color="primary" className="px-4" onClick={() => setIsPopupOpen(true)}>
                  Рассылка
                </CButton>
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
              <CFormInput type="file" label="Изображение" onChange={handlePhoto} />
              <CFormInput type="file" label="Видео" onChange={handleVideo} />
              <CFormInput type="file" label="Документ" onChange={handleDocument} />
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
                  type="text"
                  value={testUserName ?? ''}
                  onChange={(e) =>
                    setTestUserName(e.target.value ? String(e.target.value) : undefined)
                  }
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
      {isPopupOpen && (
        <ConfirmDistributionPopup onConfirm={notifyAll} popup={[isPopupOpen, setIsPopupOpen]} />
      )}
    </>
  )
}

export default DistributionPanel
