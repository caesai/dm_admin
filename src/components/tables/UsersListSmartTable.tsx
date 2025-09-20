import { useState } from 'react'
import {
  CBadge,
  CButton,
  CCardBody,
  CCol,
  CCollapse,
  CListGroup,
  CListGroupItem,
  CRow,
  CSmartTable,
} from '@coreui/react-pro'

import type { Item } from '@coreui/react-pro/src/components/smart-table/types'
import { IUser } from 'src/types/User.ts'
import { Link } from 'react-router-dom'

interface ITableProps {
  users: IUser[]
}

export const UsersListSmartTable = ({ users }: ITableProps) => {
  const [details, setDetails] = useState<number[]>([])
  const columns = [
    {
      key: 'id',
      label: '#',
      _style: { width: '5%' },
    },
    { key: 'first_name', _style: { width: '20%' }, label: 'Имя' },
    { key: 'phone_number', _style: { width: '15%' }, label: 'Телефон' },
    { key: 'telegram_id', _style: { width: '10%' }, label: 'Telegram ID' },
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

  return (
    <CSmartTable
      sorterValue={{ column: 'name', state: 'asc' }}
      clickableRows
      tableProps={{
        striped: true,
        hover: true,
      }}
      activePage={1}
      footer
      items={users}
      columns={columns}
      columnFilter
      itemsPerPageSelect
      itemsPerPage={20}
      columnSorter
      pagination
      scopedColumns={{
        early_access: (item: Item) => (
          <td>
            <CBadge color={getBadge(item.early_access)}>{item.early_access ? 'Да' : 'Нет'}</CBadge>
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
                      <Link to={`/users/${item.id}`}>
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
  )
}
