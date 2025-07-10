import {
  CCard,
  CCardBody, CCardGroup,
  CCardHeader,
  CForm, CFormInput,
  CInputGroup,
  CLoadingButton,
  CSpinner
} from '@coreui/react-pro'
import classNames from 'classnames'
import { useState } from 'react'
import { TextEditor } from 'src/components/TextEditor/TextEditor.tsx'
import {sendMailing} from "src/dataProviders/mailing.ts";

  const NotificationsPage = () => {
  const [loading,] = useState(false);
  const [testUserName, setTestUserName] = useState<string>('');
  const [editorContent, setEditorContent] = useState<any>(null);
  if (loading) {
    return <CSpinner color={'primary'} />
  }

  const testNotifications = () => {
    // /admin/mailing/
    console.log("test content: ",  editorContent);

    sendMailing([
      // 115555014,
      // 1283802964
    ], editorContent).then(r => {
      //
      console.log(r);
    });
  }

  return (
    <CCard className={'border-0 bg-transparent'}>
      <CCardHeader>Notifications Page</CCardHeader>
      <CCardGroup className={"mb-4"}>
        <CCard className="p-4">
          <CCardBody className={classNames('d-flex', 'flex-row', 'gap-2')}>
            <TextEditor onUpdate={setEditorContent}/>
          </CCardBody>
          <CCardBody className={classNames('d-flex', 'flex-row', 'gap-2')}>
            <CLoadingButton
              color="primary"
              className="px-4"
              // loading={authPending}
              onClick={testNotifications}
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
              <CInputGroup className="mb-3">
                <CFormInput
                  placeholder="@Username"
                  autoComplete="username"
                  value={testUserName}
                  onChange={(e) => setTestUserName(e.target.value)}/>
              </CInputGroup>
              <CLoadingButton
                color="primary"
                className="px-4"
                // loading={authPending}
                onClick={testNotifications}
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
