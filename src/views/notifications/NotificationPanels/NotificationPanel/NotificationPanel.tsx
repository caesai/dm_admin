import { CCard, CCardBody, CCardGroup, CTabPanel } from '@coreui/react-pro'
import classNames from 'classnames'
import { TextEditor } from 'src/components/TextEditor/TextEditor.tsx'
import ConfirmNotificationPopup from 'src/views/notifications/NotificationPopups/ConfirmNotificationPopup.tsx'
import NotificationTable from 'src/views/notifications/Tables/NotificationTable.tsx'
import { useNotificationPanel } from 'src/hooks/useNotificationPanel.ts'
import { MediaSection } from './components/MediaSection.tsx'
import { ButtonSection } from './components/ButtonSection.tsx'
import { TestSection } from './components/TestSection.tsx'
import { RestaurantSection } from './components/RestaurantSection.tsx'

const NotificationPanel = () => {
  const {
    testUserName,
    setTestUserName,
    setEditorContent,
    groupNotificationIsInProgress,
    media,
    imageUploadInProgress,
    videoUploadInProgress,
    buttonText,
    setButtonText,
    buttonUrl,
    setButtonUrl,
    currentRestaurantIds,
    isPopupOpen,
    setIsPopupOpen,
    isActiveNotificationButton,
    refreshHistoryKey,
    documentFile,
    restaurants,
    previewText,
    imageInputRef,
    videoInputRef,
    handlePhoto,
    handleVideo,
    handleDocument,
    setFileType,
    handleDeleteMedia,
    moveMediaUp,
    moveMediaDown,
    changeRestaurantIds,
    currentRestaurants,
    notifyGroup,
    notifyAll,
    previewMailing,
  } = useNotificationPanel()

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
          <MediaSection
            media={media}
            documentFile={documentFile}
            imageUploadInProgress={imageUploadInProgress}
            videoUploadInProgress={videoUploadInProgress}
            imageInputRef={imageInputRef}
            videoInputRef={videoInputRef}
            handlePhoto={handlePhoto}
            handleVideo={handleVideo}
            handleDocument={handleDocument}
            setFileType={setFileType}
            handleDeleteMedia={handleDeleteMedia}
            moveMediaUp={moveMediaUp}
            moveMediaDown={moveMediaDown}
            buttonText={buttonText}
            buttonUrl={buttonUrl}
          />
          <ButtonSection
            media={media}
            documentFile={documentFile}
            buttonText={buttonText}
            setButtonText={setButtonText}
            buttonUrl={buttonUrl}
            setButtonUrl={setButtonUrl}
          />
          <TestSection
            testUserName={testUserName}
            setTestUserName={setTestUserName}
            groupNotificationIsInProgress={groupNotificationIsInProgress}
            notifyGroup={notifyGroup}
          />
          <RestaurantSection
            currentRestaurantIds={currentRestaurantIds}
            changeRestaurantIds={changeRestaurantIds}
            restaurants={restaurants}
            previewText={previewText}
            previewMailing={previewMailing}
            isActiveNotificationButton={isActiveNotificationButton}
            setIsPopupOpen={setIsPopupOpen}
          />
        </CCard>
        <NotificationTable refreshKey={refreshHistoryKey} />
      </CTabPanel>
      {isPopupOpen && (
        <ConfirmNotificationPopup
          onConfirm={notifyAll}
          restaurants={currentRestaurants}
          popup={[isPopupOpen, setIsPopupOpen]}
        />
      )}
    </>
  )
}

export default NotificationPanel
