import {
  CCard,
  CCardBody, CCardGroup,
  CCardHeader,
  CForm, CFormInput,
  CInputGroup,
  CLoadingButton,
} from '@coreui/react-pro'
import classNames from 'classnames'
import { useState } from 'react'
import { TextEditor } from 'src/components/TextEditor/TextEditor.tsx'
import {sendMailing} from "src/dataProviders/mailing.ts";

  const NotificationsPage = () => {
  const [testUserName, setTestUserName] = useState<number | undefined>(undefined);
  const [editorContent, setEditorContent] = useState<any>(null);
  const [groupNotificationIsInProgress, setGroupNotificationIsInProgress] = useState(false);
  const [allNotificationIsInProgress, setAllNotificationIsInProgress] = useState(false);

  // Function to test notifications.
  // Examples of user ids: 115555014, 1283802964.
  const notifyGroup = async () => {
    try {
      setGroupNotificationIsInProgress(true);
      if (!testUserName) {
        console.log('No test user data provided');
        return;
      }

      const res = await sendMailing([ testUserName ], editorContent);
      console.log('Notification sent successfully:', res);
    } catch (error) {
      console.error('Error in test notification:', error);
    } finally {
      // Reset test user name after sending notification
      setTestUserName(undefined);
      setGroupNotificationIsInProgress(false);
    }
  }

  // Notify all users
  const notifyAll = async () => {
    try {
      setAllNotificationIsInProgress(true);
      const res = await sendMailing([], editorContent);
      console.log('Notification sent successfully:', res);
    } catch (error) {
      console.error('Error in test notification:', error);
    } finally {
      setAllNotificationIsInProgress(false);
    }
  }

  return (
    <CCard className={'border-0 bg-transparent'}>
      <CCardHeader>Рассылки</CCardHeader>
      <CCardGroup className={"mb-4"}>
        <CCard className="p-4">
          <CCardBody className={classNames('d-flex', 'flex-row', 'gap-2')}>
            <TextEditor onUpdate={setEditorContent}/>
          </CCardBody>
          <CCardBody className={classNames('d-flex', 'flex-row', 'gap-2')}>
            <CLoadingButton
              color="primary"
              className="px-4"
              loading={allNotificationIsInProgress}
              onClick={notifyAll}
            >
              Рассылка
            </CLoadingButton>
          </CCardBody>
        </CCard>
      </CCardGroup>
      <CCardGroup>
        <CCard className="p-4">
          <CCardBody>
            <CForm>
              <CFormInput
                placeholder="Telegram Username"
                disabled
                type={'number'}
                value={testUserName !== undefined ? testUserName : ''}
                onChange={(e) => setTestUserName(e.target.value ? Number(e.target.value) : undefined)}/>
              <CInputGroup className="mb-3">

                <CFormInput
                  placeholder="Telegram ID"
                  type={'number'}
                  value={testUserName !== undefined ? testUserName : ''}
                  onChange={(e) => setTestUserName(e.target.value ? Number(e.target.value) : undefined)}/>
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
      </CCardGroup>
    </CCard>
  )
}

export default NotificationsPage
