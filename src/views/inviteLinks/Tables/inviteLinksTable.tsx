import { ICode } from 'src/types/Code.ts'
import { CButton, CSmartTable } from '@coreui/react-pro'
import { Item } from '@coreui/react-pro/src/components/smart-table/types'
import { Dispatch, SetStateAction } from 'react'
import { INVITE_LINK } from 'src/api.ts'
import toast from 'react-hot-toast'
import { renderHTMLContent } from 'src/utils.tsx'

interface IInviteLinksTable {
  links: ICode[]
  setPopupId: Dispatch<SetStateAction<number | null | undefined>>
}

const InviteLinksTable = ({ links, setPopupId }: IInviteLinksTable) => {
  const copyCode = (id: number) => {
    const currentLink = links.find((link) => link.id === id)
    if (!currentLink) return
    navigator.clipboard.writeText(`${INVITE_LINK}${currentLink.code}`)
    toast.success('Скопировано')
  }
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
      itemsPerPageSelect
      itemsPerPage={20}
      pagination
      scopedColumns={{
        copy: (item: Item) => (
          <td>
            <CButton color="primary" onClick={() => copyCode(item.id)}>
              Копировать
            </CButton>
          </td>
        ),
        name: (item: Item) => <td>{item.name || 'Не установлено'}</td>,
        restaurant_id: (item: Item) => <td>{item.restaurant_id || '—'}</td>,
        text: (item: Item) => <td>{renderHTMLContent(item.text) || 'Не установлено'}</td>,
        edit: (item: Item) => (
          <td>
            <CButton color="primary" onClick={() => setPopupId(item.id)}>
              Редактировать
            </CButton>
          </td>
        ),
      }}
    />
  )
}

export default InviteLinksTable
