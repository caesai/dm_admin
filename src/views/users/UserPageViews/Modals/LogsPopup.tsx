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
            {Object.keys(currentLogs).map((key, index) => (
              <div className={classNames('d-flex', 'gap-2')} key={index}>
                <span>
                  <strong>{key}:</strong>
                </span>
                <span>{currentLogs[key as keyof ILogs]}</span>
              </div>
            ))}
          </CCard>
        )}
      </CModalBody>
    </CModal>
  )
}
