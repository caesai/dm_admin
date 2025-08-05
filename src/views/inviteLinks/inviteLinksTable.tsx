import { ICode } from 'src/types/Code.ts'
import { CButton, CSmartTable } from '@coreui/react-pro'
import { Item } from '@coreui/react-pro/src/components/smart-table/types'

interface IInviteLinksTable {
  links: ICode[]
}

const InviteLinksTable = ({ links }: IInviteLinksTable) => {
  const columns = [
    { key: 'code', _style: { width: '35%' }, label: 'Ссылка' },
    { key: 'copy', _style: { width: '5%' }, label: 'Копировать', filter: false },
    { key: 'name', _style: { width: '15%' }, label: 'Имя' },
    { key: 'restaurant_id', _style: { width: '15%' }, label: 'Ресторан' },
    { key: 'text', _style: { width: '25%' }, label: 'Сообщение' },
    {
      key: 'edit',
      label: 'Редактировать',
      _style: { width: '5%' },
      filter: false,
    },
  ]
  return (
    <CSmartTable
      items={links}
      clickableRows
      tableProps={{
        striped: true,
        hover: true,
        className: 'align-middle',
      }}
      activePage={1}
      footer
      columns={columns}
      columnFilter
      itemsPerPageSelect
      itemsPerPage={20}
      pagination
      scopedColumns={{
        copy: () => (
          <td>
            <CButton color="primary">Копировать</CButton>
          </td>
        ),
        name: (item: Item) => <td>{item.name || 'Не установлено'}</td>,
        restaurant_id: (item: Item) => <td>{item.restaurant_id || '—'}</td>,
        text: (item: Item) => <td>{item.text || 'Не установлено'}</td>,
        edit: () => (
          <td>
            <CButton color="primary">Редактировать</CButton>
          </td>
        ),
      }}
    />
  )
}

export default InviteLinksTable
