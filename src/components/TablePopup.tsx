import { CCard, CModal, CModalBody, CModalHeader, CModalTitle } from '@coreui/react-pro'
import classNames from 'classnames'
import { Dispatch, SetStateAction } from 'react'

interface TablePopupProps<T extends object> {
  data: [T | null, Dispatch<SetStateAction<T | null>>]
  title: string
}

export const TablePopup = <T extends object>({ data, title }: TablePopupProps<T>) => {
  const [currentObject, setObject] = data

  const formatValue = (value: unknown): string => {
    if (value === null || value === undefined) return ''
    if (typeof value === 'object') return JSON.stringify(value)
    return String(value)
  }

  return (
    <CModal
      alignment="center"
      size="lg"
      visible={currentObject !== null}
      onClose={() => setObject(null)}
    >
      <CModalHeader>
        <CModalTitle>{title}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        {currentObject !== null && (
          <CCard className={classNames('d-flex', 'flex-column', 'gap-1', 'border-0')}>
            {Object.keys(currentObject).map((key, index) => (
              <div className={classNames('d-flex', 'gap-2')} key={index}>
                <span>
                  <strong>{key}:</strong>
                </span>
                <span>{formatValue((currentObject as Record<string, unknown>)[key])}</span>
              </div>
            ))}
          </CCard>
        )}
      </CModalBody>
    </CModal>
  )
}
