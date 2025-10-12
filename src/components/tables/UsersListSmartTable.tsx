import { useState } from 'react'
import {
  CBadge,
  CButton,
  CCardBody,
  CCol,
  CCollapse,
  CFormInput,
  CListGroup,
  CListGroupItem,
  CRow,
  CSmartTable,
} from '@coreui/react-pro'

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

export const UsersListSmartTable = ({ users }: ITableProps) => {
  const [details, setDetails] = useState<number[]>([])
  const [searchConfig, setSearchConfig] = useState<ISearchConfig>(initSearchConfig)

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
      ),
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
      ),
    },
    {
      key: 'show_details',
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

  const toggleDetails = (index: number) => {
    const position = details.indexOf(index)
    let newDetails = details.slice()
    if (position !== -1) {
      newDetails.splice(position, 1)
    } else {
      newDetails = [...details, index]
    }
    setDetails(newDetails)
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
        activePage={1}
        items={searchConfig.user !== null ? [searchConfig.user] : users}
        columns={columns}
        itemsPerPageSelect
        itemsPerPage={20}
        pagination
        scopedColumns={{
          early_access: (item: Item) => (
            <td>
              <CBadge color={getBadge(item.early_access)}>
                {item.early_access ? 'Да' : 'Нет'}
              </CBadge>
            </td>
          ),
          show_details: (item: Item) => {
            return (
              <td className="py-2">
                <CButton
                  color="primary"
                  variant="outline"
                  shape="square"
                  size="sm"
                  onClick={() => {
                    toggleDetails(item.id)
                  }}
                >
                  {details.includes(item.id) ? 'Меньше' : 'Больше'}
                </CButton>
              </td>
            )
          },
          details: (item: Item) => {
            return (
              <CCollapse visible={details.includes(item.id)}>
                <CCardBody>
                  <CListGroup className={'mb-2'}>
                    <CListGroupItem>
                      <b>Пользователь</b>
                    </CListGroupItem>
                    <CListGroupItem>Email: {item.email ? item.email : 'Не указано'}</CListGroupItem>
                    <CListGroupItem>
                      Лицензионное соглашение:{' '}
                      <CBadge color={getBadge(item.license_agreement)}>
                        {item.license_agreement ? 'Да' : 'Нет'}
                      </CBadge>
                    </CListGroupItem>
                    <CListGroupItem>
                      Рассылки:{' '}
                      <CBadge color={getBadge(item.advertisement_agreement)}>
                        {item.advertisement_agreement ? 'Да' : 'Нет'}
                      </CBadge>
                    </CListGroupItem>
                    <CListGroupItem>
                      Обработка данных:{' '}
                      <CBadge color={getBadge(item.gdpr_agreement)}>
                        {item.gdpr_agreement ? 'Да' : 'Нет'}
                      </CBadge>
                    </CListGroupItem>
                    <CListGroupItem>
                      Регистрация: {new Date(item.created_at).toLocaleString()}
                    </CListGroupItem>
                    <CListGroupItem>
                      Последнее изменение: {new Date(item.updated_at).toLocaleString()}
                    </CListGroupItem>
                  </CListGroup>
                  <CRow className="justify-content-between">
                    <CCol>
                      <div style={{ display: 'flex', justifyContent: 'end' }}>
                        <Link to={`/users/${item.id}`} target="_blank" rel="noopener noreferrer">
                          <CButton size="sm" color="info">
                            Открыть
                          </CButton>
                        </Link>
                      </div>
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCollapse>
            )
          },
        }}
      />
    </>
  )
}
