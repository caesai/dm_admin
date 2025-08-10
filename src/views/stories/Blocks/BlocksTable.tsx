import { CSmartTable } from '@coreui/react-pro'

const BlocksTable = () => {
  const columns = [
    { key: 'id', _style: { width: '15%' }, label: '#' },
    { key: 'name', _style: { width: '30%' }, label: 'Имя' },
    { key: 'active', _style: { width: '15%' }, label: 'Активная' },
    { key: 'stories', _style: { width: '45%' }, label: 'Колличество историй' },
    {
      key: 'edit',
      label: 'Редактировать',
      _style: { width: '5%' },
      filter: false,
    },
  ]
  return (
    <CSmartTable
      // items={links}
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
    />
  )
}

export default BlocksTable
