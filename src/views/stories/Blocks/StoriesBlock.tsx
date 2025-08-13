import { CCard, CCardBody, CCardHeader } from '@coreui/react-pro'
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { IStoriesBlock } from 'src/types/Stories.ts'
import { getBlockById } from 'src/dataProviders/stories.ts'
import toast from 'react-hot-toast'
import BlockForm from 'src/views/stories/Blocks/BlockForm.tsx'

const StoriesBlock: FC<{
  blockId: number | null
  closeBlock: [Dispatch<SetStateAction<number | null>>, Dispatch<SetStateAction<boolean>>]
}> = ({ blockId, closeBlock }) => {
  const [isEdit, setIsEdit] = useState(false)
  const [setCurrentBlockId, setIsNewBlock] = closeBlock
  const [block, setBlock] = useState<IStoriesBlock>({
    name: '',
    active: false,
    stories: [],
  })

  const cancelBlockEdit = () => {
    setCurrentBlockId(null)
    setIsEdit(false)
    setIsNewBlock(false)
  }

  useEffect(() => {
    if (blockId !== null) {
      setIsEdit(true)
      getBlockById(blockId)
        .then((res) => setBlock(res.data as IStoriesBlock))
        .catch(() => {
          toast.error('Не удалось загрузить блок')
          cancelBlockEdit()
        })
    }
  })
  return (
    <CCard className="border-0">
      <CCardHeader className="py-3">
        {isEdit ? 'Редактирование блока историй' : 'Добавление блока историй'}
      </CCardHeader>
      <CCardBody className="p-4">
        <BlockForm
          currentBlock={[block, setBlock]}
          utilProps={[isEdit, blockId, cancelBlockEdit]}
        />
      </CCardBody>
    </CCard>
  )
}

export default StoriesBlock
