import { CButton } from '@coreui/react-pro'
import classNames from 'classnames'
import BlocksTable from 'src/views/stories/blocks/BlocksTable.tsx'
import { useState } from 'react'
import NewBlock from 'src/views/stories/blocks/NewBlock.tsx'

const StoriesPage = () => {
  const [isNewBlock, setIsNewBlock] = useState(false)
  return (
    <>
      {isNewBlock ? null : (
        <div className={classNames('d-flex', 'justify-content-end')}>
          <CButton color="primary" onClick={() => setIsNewBlock(true)}>
            + Новый блок историй
          </CButton>
        </div>
      )}
      {isNewBlock ? <NewBlock /> : <BlocksTable />}
    </>
  )
}

export default StoriesPage
