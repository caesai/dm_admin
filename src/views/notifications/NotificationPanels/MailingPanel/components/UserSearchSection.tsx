import { CButton, CCard, CCardBody, CFormInput } from '@coreui/react-pro'
import classNames from 'classnames'
import { IMailingUser } from 'src/types/Mailing.ts'

interface UserSearchSectionProps {
  currentId: number
  handleChangeId: (e: React.ChangeEvent<HTMLInputElement>) => void
  searchUser: () => void
  selectedUser: IMailingUser | null
  sendMailing: () => void
  deleteMailing: () => void
}

export const UserSearchSection = ({
  currentId,
  handleChangeId,
  searchUser,
  selectedUser,
  sendMailing,
  deleteMailing,
}: UserSearchSectionProps) => {
  return (
    <CCard className="border">
      <CCardBody className={classNames('d-flex', 'flex-column', 'gap-2')}>
        <div className={classNames('d-flex', 'gap-2')}>
          <CFormInput
            placeholder="ID клиента"
            onChange={handleChangeId}
            value={currentId === 0 ? '' : currentId}
          />
          <CButton color="primary" onClick={searchUser}>
            Поиск
          </CButton>
        </div>
        {selectedUser &&
          (selectedUser.mailing_enabled ? (
            <CButton color="primary" onClick={sendMailing}>
              Не отправлять клиенту рассылку
            </CButton>
          ) : (
            <CButton color="primary" onClick={deleteMailing}>
              Отправлять клиенту рассылку
            </CButton>
          ))}
      </CCardBody>
    </CCard>
  )
}
