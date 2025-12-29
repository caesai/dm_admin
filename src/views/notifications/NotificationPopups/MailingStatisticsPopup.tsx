import { CCard, CModal, CModalBody, CModalHeader, CModalTitle, CSpinner } from '@coreui/react-pro'
import classNames from 'classnames'
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { getMailingStatistics } from 'src/dataProviders/mailing.ts'
import toast from 'react-hot-toast'

const MailingStatisticsPopup: FC<{
  popup: [number | null, Dispatch<SetStateAction<number | null>>]
}> = ({ popup }) => {
  const [mailingId, setMailingId] = popup
  const [statistics, setStatistics] = useState<Record<string, unknown> | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (mailingId !== null) {
      setIsLoading(true)
      setStatistics(null)
      getMailingStatistics(mailingId)
        .then((response) => {
          setStatistics(response.data)
        })
        .catch(() => {
          toast.error('Что-то пошло не так')
          setStatistics(null)
          setMailingId(null)
        })
        .finally(() => {
          setIsLoading(false)
        })
    } else {
      setStatistics(null)
    }
  }, [mailingId])

  const formatValue = (value: unknown): string => {
    if (value === null || value === undefined) return ''
    if (typeof value === 'object') return JSON.stringify(value, null, 2)
    return String(value)
  }

  return (
    <CModal
      alignment="center"
      size="lg"
      visible={mailingId !== null}
      onClose={() => setMailingId(null)}
    >
      <CModalHeader>
        <CModalTitle>Статистика рассылки</CModalTitle>
      </CModalHeader>
      <CModalBody>
        {isLoading ? (
          <div
            className={classNames('d-flex', 'justify-content-center', 'align-items-center', 'py-5')}
          >
            <CSpinner color="primary" />
          </div>
        ) : statistics !== null ? (
          <CCard className={classNames('d-flex', 'flex-column', 'gap-1', 'border-0')}>
            {Object.keys(statistics).map((key, index) => (
              <div className={classNames('d-flex', 'gap-2')} key={index}>
                <span>
                  <strong>{key}:</strong>
                </span>
                <span>{formatValue(statistics[key])}</span>
              </div>
            ))}
          </CCard>
        ) : null}
      </CModalBody>
    </CModal>
  )
}

export default MailingStatisticsPopup
