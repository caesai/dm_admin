import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCardHeader,
  CForm,
  CFormInput,
  CInputGroup,
  CLoadingButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTabPanel,
} from '@coreui/react-pro'
import classNames from 'classnames'
import { TextEditor } from 'src/components/TextEditor/TextEditor.tsx'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import ConfirmNotificationPopup from 'src/views/notifications/NotificationPopups/ConfirmNotificationPopup.tsx'
import toast from 'react-hot-toast'
import NotificationHistory from 'src/views/notifications/NotificationPanels/NotificationHistory.tsx'
import TooltipInfo from 'src/components/TooltipInfo'
import { cilArrowBottom, cilArrowTop } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { uploadFile } from 'src/dataProviders/s3.ts'
import { sendMailingContent, sendMailingGroup } from 'src/dataProviders/mailing.ts'

interface IMedia {
  id: string
  name: string
  url: string
  type: 'photo' | 'video' | 'document'
}

const NotificationPanel = () => {
  const [testUserName, setTestUserName] = useState<string>('')
  const [editorContent, setEditorContent] = useState<any>(null)
  const [groupNotificationIsInProgress, setGroupNotificationIsInProgress] = useState(false)
  const [media, setMedia] = useState<IMedia[]>([])
  const [document, setDocument] = useState<IMedia | undefined>(undefined)
  const [buttonText, setButtonText] = useState<string>('')
  const [buttonUrl, setButtonUrl] = useState<string>('')
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false)
  const [isActiveNotificationButton, setIsActiveNotificationButton] = useState<boolean>(false)
  const [refreshHistoryKey, setRefreshHistoryKey] = useState<number>(0)

  const imageInputRef = useRef<HTMLInputElement>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)

  const handleSuccess = () => {
    setRefreshHistoryKey((key) => key + 1)
  }

  const sendMailing = async (
    users_ids: Array<string>,
    text: string,
    mediaList: IMedia[],
    documentFile: IMedia | undefined,
    button_text: string,
    button_url: string,
  ) => {
    try {
      const btnText = button_text || undefined
      const btnUrl = button_url || undefined
      const mediaItems = mediaList.map((item) => [item.url, item.type, item.name])
      if (documentFile || media.length === 1) {
        await sendMailingContent({
          users_ids: users_ids,
          text: text,
          button_text: btnText,
          button_url: btnUrl,
          media_url: documentFile ? documentFile.url : media[0].url,
          media_type: documentFile ? documentFile.type : media[0].type,
          media_filename: documentFile ? documentFile.name : media[0].name,
        })
      } else if (!documentFile && media.length > 1) {
        await sendMailingGroup({
          users_ids: users_ids,
          text: text,
          button_text: btnText,
          button_url: btnUrl,
          media_items: mediaItems,
        })
      } else {
        await sendMailingContent({
          users_ids: users_ids,
          text: text,
          button_text: btnText,
          button_url: btnUrl,
        })
      }
      handleSuccess()
    } catch (error) {
      console.log(error)
      toast.error('Ошибка при отправке рассылки: ' + error)
    }
  }

  // Function to test notifications.
  const notifyGroup = async () => {
    try {
      setGroupNotificationIsInProgress(true)
      if (!testUserName) {
        toast.error('Отсутствует Telegram ID для теста.')
        return
      }
      if (!editorContent && !media && !document) {
        toast.error('Отсутствует контент для рассылки.')
        return
      }

      await sendMailing([testUserName], editorContent, media, document, buttonText, buttonUrl)
      toast.success('Тестовая рассылка успешно отправлена.')
    } catch (error) {
      console.log(error)
      toast.error('Ошибка в тестовой рассылке: ' + error)
    } finally {
      setGroupNotificationIsInProgress(false)
      setIsActiveNotificationButton(true)
    }
  }

  // Notify all users
  const notifyAll = async () => {
    try {
      await sendMailing([], editorContent, media, document, buttonText, buttonUrl)
      toast.success('Рассылка успешно отправлена.')
    } catch (error) {
      console.log(error)
      toast.error('Ошибка в рассылке: ' + error)
    }
  }

  const handlePhoto = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const fileId = `photo-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
      const fileName = file.name

      uploadFile(file)
        .then((res) => {
          setMedia((prev) => [
            ...prev,
            {
              id: fileId,
              name: fileName,
              url: res.data.url,
              type: 'photo',
            },
          ])
          if (imageInputRef.current) {
            imageInputRef.current.value = ''
          }
        })
        .catch(() => toast.error('Не удалось загрузить изображение'))
    }
  }

  const handleVideo = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const fileId = `video-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
      const fileName = file.name

      uploadFile(file)
        .then((res) => {
          setMedia((prev) => [
            ...prev,
            {
              id: fileId,
              name: fileName,
              url: res.data.url,
              type: 'video',
            },
          ])
          if (videoInputRef.current) {
            videoInputRef.current.value = ''
          }
        })
        .catch(() => toast.error('Не удалось загрузить видео'))
    }
  }

  const handleDocument = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const fileId = `document-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
      const fileName = file.name

      uploadFile(file)
        .then((res) => {
          setDocument({
            id: fileId,
            name: fileName,
            url: res.data.url,
            type: 'document',
          })
        })
        .catch(() => toast.error('Не удалось загрузить документ'))
    }
  }

  const setFileType = (type: string) => {
    switch (type) {
      case 'photo':
        return 'Изображение'
      case 'video':
        return 'Видео'
      case 'document':
        return 'Документ'
      default:
        return 'Ошибка'
    }
  }

  const handleDeleteMedia = (id: string) => {
    setMedia((prev) => prev.filter((i) => i.id !== id))
  }

  const moveMediaUp = (index: number) => {
    if (index <= 0) return

    setMedia((prev) => {
      const newMedia = [...prev]
      ;[newMedia[index - 1], newMedia[index]] = [newMedia[index], newMedia[index - 1]]
      return newMedia
    })
  }

  const moveMediaDown = (index: number) => {
    if (index >= media.length - 1) return

    setMedia((prev) => {
      const newMedia = [...prev]
      ;[newMedia[index], newMedia[index + 1]] = [newMedia[index + 1], newMedia[index]]
      return newMedia
    })
  }

  useEffect(() => {
    setIsActiveNotificationButton(false)
  }, [editorContent, media, document, buttonText, buttonUrl])

  return (
    <>
      <CTabPanel itemKey="distribution">
        <CCard className={classNames('mb-4', 'border-0')}>
          <CCardBody>
            <CCardGroup className="flex-column">
              <CCardBody className={classNames('d-flex', 'flex-row')}>
                <TextEditor onUpdate={setEditorContent} initialContent="Текст рассылки..." />
              </CCardBody>
            </CCardGroup>
          </CCardBody>
          <CCard className="mb-4 mx-2">
            <CCardHeader>
              <div className="d-flex align-items-center">
                <p>Прикреплённые Медиа</p>
                <div className="ms-2">
                  <TooltipInfo content="текст тултипа" />
                </div>
              </div>
            </CCardHeader>
            <CCardBody>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Файл</CTableHeaderCell>
                    <CTableHeaderCell>Тип</CTableHeaderCell>
                    <CTableHeaderCell>Вверх</CTableHeaderCell>
                    <CTableHeaderCell>Вниз</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Удалить</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {media.map((file, index) => (
                    <CTableRow key={file.id}>
                      <CTableDataCell>{file.name}</CTableDataCell>
                      <CTableDataCell>{setFileType(file.type)}</CTableDataCell>
                      <CTableDataCell>
                        <CIcon
                          icon={cilArrowTop}
                          size="xl"
                          style={{ cursor: 'pointer' }}
                          onClick={() => moveMediaUp(index)}
                        />
                      </CTableDataCell>
                      <CTableDataCell>
                        <CIcon
                          icon={cilArrowBottom}
                          size="xl"
                          style={{ cursor: 'pointer' }}
                          onClick={() => moveMediaDown(index)}
                        />
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CButton color="primary" onClick={() => handleDeleteMedia(file.id)}>
                          Удалить
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
              {!document && (
                <div className={classNames('d-flex', 'gap-3', 'justify-content-end')}>
                  <CButton
                    color="primary"
                    disabled={
                      (media.length === 1 && !!(buttonText || buttonUrl)) || media.length >= 10
                    }
                  >
                    <label htmlFor="imageInput">+ Прикрепить Изображение</label>
                  </CButton>
                  <input
                    ref={imageInputRef}
                    type="file"
                    id="imageInput"
                    onChange={handlePhoto}
                    accept="image/*"
                    className="d-none"
                  />
                  <CButton
                    color="primary"
                    disabled={
                      (media.length === 1 && !!(buttonText || buttonUrl)) || media.length >= 10
                    }
                  >
                    <label htmlFor="videoInput">+ Прикрепить Видео</label>
                  </CButton>
                  <input
                    ref={videoInputRef}
                    type="file"
                    id="videoInput"
                    onChange={handleVideo}
                    accept="video/*"
                    className="d-none"
                  />
                </div>
              )}
              {media.length === 0 && (
                <div className="mt-3">
                  <CFormInput
                    type="file"
                    label={
                      <div className="d-flex align-items-center">
                        Документ
                        <div className="ms-2">
                          <TooltipInfo content="текст тултипа" />
                        </div>
                      </div>
                    }
                    onChange={handleDocument}
                  />
                </div>
              )}
            </CCardBody>
          </CCard>
          {media.length <= 1 && (
            <CCard className="mb-4 mx-2">
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
          )}
          <CCard className="mx-2">
            <CCardHeader>
              <div className="d-flex align-items-center">
                <p>Тест рассылки</p>
                <div className="ms-2">
                  <TooltipInfo content="Введите Telegram ID пользователя для теста рассылки" />
                </div>
              </div>
            </CCardHeader>
            <CCardBody>
              <CForm>
                <CInputGroup className="mb-3">
                  <CFormInput
                    placeholder="Telegram ID"
                    type="text"
                    value={testUserName}
                    onChange={(e) => setTestUserName(e.target.value)}
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
          <CCardBody className="d-flex">
            <div className="d-flex align-items-center">
              <CButton
                color="primary"
                className="px-4"
                onClick={() => setIsPopupOpen(true)}
                disabled={!isActiveNotificationButton}
              >
                Рассылка
              </CButton>
              <div className="ms-2">
                <TooltipInfo content="Разослать сообщение всем пользователям. Функция доступна только после теста рассылки." />
              </div>
            </div>
          </CCardBody>
        </CCard>
        <NotificationHistory refreshKey={refreshHistoryKey} />
      </CTabPanel>
      {isPopupOpen && (
        <ConfirmNotificationPopup onConfirm={notifyAll} popup={[isPopupOpen, setIsPopupOpen]} />
      )}
    </>
  )
}

export default NotificationPanel
