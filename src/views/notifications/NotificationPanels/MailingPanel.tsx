import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CSmartTable,
  CTabPanel,
  CFormInput,
} from '@coreui/react-pro'
import classNames from 'classnames'
import { FC, useCallback, useEffect, useState, ChangeEvent } from 'react'
import { Item } from '@coreui/react-pro/src/components/smart-table/types.ts'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import {
  getUsersMailingList,
  addUsersMailing,
  deleteUsersMailing,
} from 'src/dataProviders/users.ts'
import { IMailingUser } from 'src/types/Mailing.ts'

const MailingPanel: FC = () => {
  const [users, setUsers] = useState<IMailingUser[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [itemsPerPage, setItemsPerPage] = useState<number>(20)
  const [totalItems, setTotalItems] = useState<number>(0)
  const [selectedUser, setSelectedUser] = useState<IMailingUser | null>(null)
  const [currentId, setCurrentId] = useState<number>(0)

  const loadUsers = useCallback(() => {
    getUsersMailingList()
      .then((res) => {
        setUsers(res.data)
        // setTotalItems(res.data.total)
      })
      .catch(() => toast.error('Не удалось загрузить пользоваетелей'))
  }, [currentPage, itemsPerPage])

  const sendMailing = () => {
    if (!selectedUser) return

    addUsersMailing(selectedUser.id)
      .then(() => {
        toast('Вы включили рассылку для пользователя')
        setSelectedUser((prev) => {
          if (!prev) return prev

          return {
            ...prev,
            mailing_enabled: !prev.mailing_enabled,
          }
        })
      })
      .catch(() => toast.error('Произошла ошибка'))
  }

  const deleteMailing = () => {
    if (!selectedUser) return

    deleteUsersMailing(selectedUser.id)
      .then(() => toast('Вы отключили рассылку у пользователя'))
      .catch(() => toast.error('Произошла ошибка'))
  }

  const handleChangeId = (e: ChangeEvent<HTMLInputElement>) => {
    const id = Number(e.target.value)
    setCurrentId(id)
  }

  const searchUser = () => {
    const currentUser = users.find((user) => user.id === currentId)

    if (!currentUser) {
      toast.error('Не удалось найти пользователя')
      setSelectedUser(null)
    } else {
      setSelectedUser(currentUser)
    }
  }

  useEffect(() => {
    void loadUsers()
  }, [loadUsers])

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
    <CTabPanel itemKey="mailing">
      <CCard className={classNames('d-flex', 'flex-column', 'p-3', 'gap-3', 'border-0')}>
        <CCard className="border">
          <CCardBody className={classNames('d-flex', 'flex-column', 'gap-2')}>
            <div className={classNames('d-flex', 'gap-2')}>
              <CFormInput placeholder="ID клиента" onChange={handleChangeId} />
              <CButton color="primary" onClick={searchUser}>
                Поиск
              </CButton>
            </div>
            {selectedUser &&
              (selectedUser.mailing_enabled ? (
                <CButton color="primary" onClick={deleteMailing}>
                  Не отправлять клиенту рассылку
                </CButton>
              ) : (
                <CButton color="primary" onClick={sendMailing}>
                  Отправлять клиенту рассылку
                </CButton>
              ))}
          </CCardBody>
        </CCard>
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
      </CCard>
    </CTabPanel>
  )
}

export default MailingPanel
