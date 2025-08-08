import { CButton } from '@coreui/react-pro'
import classNames from 'classnames'
import StoryTable from 'src/views/stories/StoriesTable.tsx'
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
      {isNewBlock ? <NewBlock /> : <StoryTable />}
    </>
  )
}

export default StoriesPage
