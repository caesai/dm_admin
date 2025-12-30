import { CCard, CCardHeader, CSmartTable } from '@coreui/react-pro'
import classNames from 'classnames'
import { Item } from '@coreui/react-pro/src/components/smart-table/types.ts'
import { Link } from 'react-router-dom'
import { CButton } from '@coreui/react-pro'
import { IMailingUser } from 'src/types/Mailing.ts'

interface UsersTableProps {
  users: IMailingUser[]
  currentPage: number
  setCurrentPage: (page: number) => void
  itemsPerPage: number
  setItemsPerPage: (items: number) => void
  totalItems: number
}

export const UsersTable = ({
  users,
  currentPage,
  setCurrentPage,
  itemsPerPage,
  setItemsPerPage,
  totalItems,
}: UsersTableProps) => {
  const cols = [
    {
      key: 'id',
      label: 'ID',
      _props: { scope: 'col' },
    },
    {
      key: 'client',
      label: 'Клиент',
      _props: { scope: 'col' },
    },
    {
      key: 'telegram_id',
      label: 'Telegram ID',
      _props: { scope: 'col' },
    },
    {
      key: 'phone_number',
      label: 'Телефон',
      _props: { scope: 'col' },
    },
    {
      key: 'open',
      label: 'Открыть',
      _props: { scope: 'col' },
    },
  ]

  return (
    <CCard className={'border'}>
      <CCardHeader>
        <strong>Пользователи, которые отказались от рассылки</strong>
      </CCardHeader>
      <CSmartTable
        columns={cols}
        items={users}
        clickableRows
        itemsPerPageSelect
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={setItemsPerPage}
        itemsPerPageOptions={[10, 20, 50, 100]}
        pagination
        paginationProps={{
          pages: Math.ceil(totalItems / itemsPerPage),
          activePage: currentPage,
          onActivePageChange: setCurrentPage,
        }}
        tableHeadProps={{
          className: 'align-middle',
        }}
        tableProps={{
          striped: true,
          hover: true,
          className: classNames('align-middle', 'text-center'),
        }}
        scopedColumns={{
          client: (item: Item) => (
            <td>{item.last_name ? `${item.first_name} ${item.last_name}` : item.first_name}</td>
          ),
          open: (item: Item) => (
            <td className="pe-0">
              <Link to={`/users/${item.id}`} target="_blank" rel="noopener noreferrer">
                <CButton size="sm" color="primary">
                  Открыть
                </CButton>
              </Link>
            </td>
          ),
        }}
      />
    </CCard>
  )
}
