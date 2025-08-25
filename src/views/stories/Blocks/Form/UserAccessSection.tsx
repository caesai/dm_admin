import { ChangeEvent, FC, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CFormCheck,
  CFormInput,
  CButton,
  CRow,
  CTooltip,
} from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { cilInfo } from '@coreui/icons'

interface UserAccessSectionProps {
  isForAll: boolean
  onForAllChange: () => void
  users: number[]
  onAddUser: (userId: number) => void
  onRemoveUser: (userId: number) => void
}

export const UserAccessSection: FC<UserAccessSectionProps> = ({
  isForAll,
  onForAllChange,
  users,
  onAddUser,
  onRemoveUser,
}) => {
  const [currentUser, setCurrentUser] = useState<number | null>(null)

  const handleAddUser = () => {
    if (currentUser !== null) {
      onAddUser(currentUser)
      setCurrentUser(null)
    }
  }

  const handleUserInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setCurrentUser(value ? Number(value) : null)
  }

  return (
    <>
      <CRow className="mb-3">
        <CFormCheck
          label="Доступен всем пользователям"
          onChange={onForAllChange}
          checked={isForAll}
        />
      </CRow>
      {!isForAll && (
        <CRow className="mb-3">
          <CCard className="p-0">
            <CCardHeader className="d-flex">
              Доступно для аккаунтов:
              <div className="ms-3">
                <CTooltip content="Текст тултипа">
                  <CIcon icon={cilInfo} />
                </CTooltip>
              </div>
            </CCardHeader>
            <CCardBody>
              {users.map((user) => (
                <CFormCheck
                  key={user}
                  label={user.toString()}
                  indeterminate
                  className="mb-4"
                  onClick={() => onRemoveUser(user)}
                />
              ))}
              <div className="d-flex gap-2">
                <CButton color="primary" className="px-2" onClick={handleAddUser}>
                  Добавить
                </CButton>
                <CFormInput
                  placeholder="Telegram ID"
                  className="text-center w-auto"
                  value={currentUser === null ? '' : String(currentUser)}
                  onInput={handleUserInput}
                />
              </div>
            </CCardBody>
          </CCard>
        </CRow>
      )}
    </>
  )
}
