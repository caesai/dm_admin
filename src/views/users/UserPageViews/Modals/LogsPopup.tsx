import { CCard, CModal, CModalBody, CModalHeader, CModalTitle } from '@coreui/react-pro'
import classNames from 'classnames'
import { Dispatch, FC, SetStateAction } from 'react'
import { ILogs } from 'src/types/Logs.ts'

export const LogsPopup: FC<{
  logs: [ILogs | null, Dispatch<SetStateAction<ILogs | null>>]
}> = ({ logs }) => {
  const [currentLogs, setCurrentLogs] = logs

  return (
    <CModal
      alignment="center"
      size="lg"
      visible={currentLogs !== null}
      onClose={() => setCurrentLogs(null)}
    >
      <CModalHeader>
        <CModalTitle>Логи</CModalTitle>
      </CModalHeader>
      <CModalBody>
        {currentLogs !== null && (
          <CCard className={classNames('d-flex', 'flex-column', 'gap-1', 'border-0')}>
            <div className={classNames('d-flex', 'gap-2')}>
              <span>action:</span>
              <span>{currentLogs.action}</span>
            </div>
            <div className={classNames('d-flex', 'gap-2')}>
              <span>category:</span>
              <span>{currentLogs.category}</span>
            </div>
            <div className={classNames('d-flex', 'gap-2')}>
              <span>created_at:</span>
              <span>{currentLogs.created_at}</span>
            </div>
            <div className={classNames('d-flex', 'gap-2')}>
              <span>description:</span>
              <span>{currentLogs.description}</span>
            </div>
            <div className={classNames('d-flex', 'gap-2')}>
              <span>id:</span>
              <span>{currentLogs.id}</span>
            </div>
            <div className={classNames('d-flex', 'gap-2')}>
              <span>request_data:</span>
              <span>{currentLogs.request_data}</span>
            </div>
            <div className={classNames('d-flex', 'gap-2')}>
              <span>response_data:</span>
              <span>{currentLogs.response_data}</span>
            </div>
            <div className={classNames('d-flex', 'gap-2')}>
              <span>sent_message:</span>
              <span>{currentLogs.sent_message}</span>
            </div>
            <div className={classNames('d-flex', 'gap-2')}>
              <span>user_id:</span>
              <span>{currentLogs.user_id}</span>
            </div>
          </CCard>
        )}
      </CModalBody>
    </CModal>
  )
}
