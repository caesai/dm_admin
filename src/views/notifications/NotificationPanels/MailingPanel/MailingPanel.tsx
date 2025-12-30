import { CCard, CTabPanel } from '@coreui/react-pro'
import classNames from 'classnames'
import { useMailingPanel } from 'src/hooks/useMailingPanel.ts'
import { UserSearchSection } from './components/UserSearchSection.tsx'
import { UsersTable } from './components/UsersTable.tsx'

const MailingPanel = () => {
  const {
    users,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    totalItems,
    selectedUser,
    currentId,
    handleChangeId,
    searchUser,
    sendMailing,
    deleteMailing,
  } = useMailingPanel()

  return (
    <CTabPanel itemKey="mailing">
      <CCard className={classNames('d-flex', 'flex-column', 'p-3', 'gap-3', 'border-0')}>
        <UserSearchSection
          currentId={currentId}
          handleChangeId={handleChangeId}
          searchUser={searchUser}
          selectedUser={selectedUser}
          sendMailing={sendMailing}
          deleteMailing={deleteMailing}
        />
        <UsersTable
          users={users}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          totalItems={totalItems}
        />
      </CCard>
    </CTabPanel>
  )
}

export default MailingPanel
