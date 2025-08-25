import { CButton } from '@coreui/react-pro'
import classNames from 'classnames'
import { useState } from 'react'
import BlocksTable from 'src/views/stories/Blocks/BlocksTable.tsx'
import Block from 'src/views/stories/Blocks/Block.tsx'

const StoriesPage = () => {
  const [isNewBlock, setIsNewBlock] = useState(false)
  const [currentBlockId, setCurrentBlockId] = useState<number | null>(null)
  return (
    <>
      {isNewBlock || currentBlockId !== null ? null : (
        <div className={classNames('d-flex', 'justify-content-end')}>
          <CButton color="primary" onClick={() => setIsNewBlock(true)}>
            + Новый блок историй
          </CButton>
        </div>
      )}
      {isNewBlock || currentBlockId !== null ? (
        <Block
          id={[currentBlockId, setCurrentBlockId]}
          closeBlock={[setCurrentBlockId, setIsNewBlock]}
        />
      ) : (
        <BlocksTable setBlockId={setCurrentBlockId} />
      )}
    </>
  )
}

export default StoriesPage
