import { CButton, CSmartTable, CSpinner } from '@coreui/react-pro'
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { IStoriesBlock } from 'src/types/Stories.ts'
import { getBlocksList } from 'src/dataProviders/stories.ts'

const BlocksTable: FC<{
  setBlockId: Dispatch<SetStateAction<number | null>>
}> = ({ setBlockId }) => {
  const [blocks, setBlocks] = useState<IStoriesBlock[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const columns = [
    { key: 'id', _style: { width: '15%' }, label: '#' },
    { key: 'name', _style: { width: '30%' }, label: 'Имя' },
    { key: 'active', _style: { width: '15%' }, label: 'Активная' },
    { key: 'stories_count', _style: { width: '45%' }, label: 'Количество историй' },
    {
      key: 'edit',
      label: 'Редактировать',
      _style: { width: '5%' },
      filter: false,
    },
  ]

  useEffect(() => {
    setIsLoading(true)
    getBlocksList()
      .then((res) => setBlocks(res.data))
      .finally(() => setIsLoading(false))
  }, [])

  if (isLoading) {
    return <CSpinner color={'primary'} />
  }

  return (
    <CSmartTable
      items={blocks}
      clickableRows
      tableProps={{
        striped: true,
        hover: true,
        className: 'align-middle',
      }}
      activePage={1}
      columns={columns}
      itemsPerPageSelect
      itemsPerPage={20}
      pagination
      scopedColumns={{
        active: (block: IStoriesBlock) => <td>{block.active ? 'Да' : 'Нет'}</td>,
        edit: (block: IStoriesBlock) => (
          <td>
            <CButton color="primary" onClick={() => (block.id ? setBlockId(block.id) : null)}>
              Редактировать
            </CButton>
          </td>
        ),
      }}
    />
  )
}

export default BlocksTable
