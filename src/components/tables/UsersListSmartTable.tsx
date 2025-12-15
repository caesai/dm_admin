import { Dispatch, SetStateAction, useState } from 'react'
import { CBadge, CButton, CFormInput, CSmartTable } from '@coreui/react-pro'

import type { Item } from '@coreui/react-pro/src/components/smart-table/types'
import { IUser, IUserFull } from 'src/types/User.ts'
import { Link } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import { cilSearch } from '@coreui/icons'
import classNames from 'classnames'
import { getUserBySearch } from 'src/dataProviders/users.ts'
import toast from 'react-hot-toast'

interface ITableProps {
  users: IUser[]
  tableConfig: {
    currentPage: number
    itemsPerPage: number
    setCurrentPage: Dispatch<SetStateAction<number>>
    setItemsPerPage: Dispatch<SetStateAction<number>>
    totalItems: number
  }
}

interface ISearchConfig {
  isActive: boolean
  type: 'tg_id' | 'phone'
  value: string
  user: IUserFull | null
}

const initSearchConfig: ISearchConfig = {
  isActive: false,
  type: 'tg_id',
  value: '',
  user: null,
}

export const UsersListSmartTable = ({ users, tableConfig }: ITableProps) => {
  const [searchConfig, setSearchConfig] = useState<ISearchConfig>(initSearchConfig)
  const { currentPage, itemsPerPage, setCurrentPage, setItemsPerPage, totalItems } = tableConfig

  const columns = [
    {
      key: 'id',
      label: 'ID',
      _style: { width: '5%' },
    },
    { key: 'first_name', _style: { width: '20%' }, label: 'Имя' },
    {
      key: 'phone_number',
      _style: { width: '15%' },
      label: (
        <div className={classNames('d-flex', 'align-items-center', 'gap-3')}>
          <span>Телефон</span>
          <CIcon
            icon={cilSearch}
            style={{ cursor: 'pointer' }}
            onClick={() => handleSearchChange('phone')}
          />
        </div>
      ) as never,
    },
    {
      key: 'telegram_id',
      _style: { width: '10%' },
      label: (
        <div className={classNames('d-flex', 'align-items-center', 'gap-3')}>
          <span>Telegram ID</span>
          <CIcon
            icon={cilSearch}
            style={{ cursor: 'pointer' }}
            onClick={() => handleSearchChange('tg_id')}
          />
        </div>
      ) as never,
    },
    {
      key: 'user_link',
      label: '',
      _style: { width: '1%' },
      filter: true,
      sorter: true,
    },
  ]

  const getBadge = (status: boolean) => {
    return status ? 'success' : 'secondary'
  }

  const getSearchPlaceholder = () => {
    return searchConfig.type === 'tg_id' ? 'Telegram ID' : 'номер телефона'
  }

  const searchUser = async () => {
    if (searchConfig.value.length === 0) return
    await getUserBySearch(Number(searchConfig.value), searchConfig.type)
      .then((response) => {
        setSearchConfig((prev) => ({
          ...prev,
          user: response.data,
        }))
      })
      .catch(() => toast.error('Пользователь не найден'))
  }

  const handleSearchChange = (type?: 'tg_id' | 'phone') => {
    setSearchConfig((prev) => ({
      isActive: true,
      type: type ? type : prev.type,
      value: '',
      user: null,
    }))
  }

  const closeSearchTool = () => {
    setSearchConfig(initSearchConfig)
  }

  return (
    <>
      {searchConfig.isActive && (
        <div className={classNames('d-flex', 'align-items-center', 'gap-3', 'mb-3')}>
          <CFormInput
            placeholder={`Введите ${getSearchPlaceholder()}`}
            value={searchConfig.value}
            onChange={(e) =>
              setSearchConfig((prev) => ({
                ...prev,
                value: e.target.value,
              }))
            }
          />
          <div className={classNames('d-flex', 'align-items-center', 'gap-2', 'w-25')}>
            <CButton color="primary" className="w-50" onClick={searchUser}>
              Найти
            </CButton>
            <CButton color="secondary" className="w-50" onClick={closeSearchTool}>
              Закрыть
            </CButton>
          </div>
        </div>
      )}
      <CSmartTable
        sorterValue={{ column: 'name', state: 'asc' }}
        clickableRows
        tableProps={{
          striped: true,
          hover: true,
        }}
        items={searchConfig.user !== null ? [searchConfig.user] : users}
        itemsPerPageSelect
        itemsPerPageOptions={[10, 20, 50, 100]}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={setItemsPerPage}
        pagination
        paginationProps={{
          pages: Math.ceil(totalItems / itemsPerPage),
          activePage: currentPage,
          onActivePageChange: setCurrentPage,
        }}
        columns={columns}
        scopedColumns={{
          early_access: (item: Item) => (
            <td>
              <CBadge color={getBadge(item.early_access)}>
                {item.early_access ? 'Да' : 'Нет'}
              </CBadge>
            </td>
          ),
          user_link: (item: Item) => {
            return (
              <td className="py-2">
                <div style={{ display: 'flex', justifyContent: 'end' }}>
                  <Link to={`/users/${item.id}`} target="_blank" rel="noopener noreferrer">
                    <CButton size="sm" color="primary">
                      Открыть
                    </CButton>
                  </Link>
                </div>
              </td>
            )
          },
        }}
      />
    </>
  )
}
