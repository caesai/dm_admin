import { Dispatch, FC, SetStateAction } from 'react'
import { CRow, CButton } from '@coreui/react-pro'
import StoriesTable from 'src/views/stories/Stories/StoriesTable.tsx'
import { IStory } from 'src/types/Stories.ts'

interface StoriesSectionProps {
  stories: IStory[]
  popup: [boolean, Dispatch<SetStateAction<boolean>>]
  onStoriesChange: Dispatch<SetStateAction<IStory[]>>
  onUpdateStories: Dispatch<SetStateAction<IStory[]>>
  onDeleteStories: Dispatch<SetStateAction<IStory[]>>
}

export const StoriesSection: FC<StoriesSectionProps> = ({
  stories,
  popup,
  onStoriesChange,
  onUpdateStories,
  onDeleteStories,
}) => {
  const [isPopupOpen, setOpenPopup] = popup
  return (
    <>
      <CRow className="py-3 border-bottom border-top mt-4">
        <div className="d-flex justify-content-between align-items-center flex-nowrap">
          <strong>Истории</strong>
          <CButton
            color="primary"
            style={{ width: 'fit-content' }}
            onClick={() => setOpenPopup(true)}
          >
            + Добавить историю
          </CButton>
        </div>
      </CRow>

      <CRow className="mb-3">
        <StoriesTable
          popup={[isPopupOpen, setOpenPopup]}
          stories={[stories, onStoriesChange]}
          updateStories={onUpdateStories}
          deleteStories={onDeleteStories}
        />
      </CRow>
    </>
  )
}
