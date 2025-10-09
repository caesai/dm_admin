import classNames from 'classnames'
import {
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom, cilArrowTop } from '@coreui/icons'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import StoryPopup from 'src/views/stories/Stories/Popup/StoryPopup.tsx'
import { IStory, StoryType } from 'src/types/Stories.ts'

const StoriesTable: FC<{
  popup: [boolean, Dispatch<SetStateAction<boolean>>]
  stories: [IStory[], Dispatch<SetStateAction<IStory[]>>]
  updateStories: Dispatch<SetStateAction<IStory[]>>
  deleteStories: Dispatch<SetStateAction<IStory[]>>
}> = ({ popup, stories, updateStories, deleteStories }) => {
  const [, setOpenStoryPopup] = popup
  const [isEdit, setIsEdit] = useState(false)
  const [currentStory, setCurrentStory] = useState<IStory | null>(null)

  const [storiesList, setStoriesList] = stories
  const setStoryType = (type: StoryType) => {
    switch (type) {
      case 'image':
        return 'Изображение'
      case 'video':
        return 'Видео'
      case 'component':
        return 'Кастомная'
    }
  }

  const handleStoryDelete = (story: IStory) => {
    deleteStories((prev) => [...prev, story])
    setStoriesList((prevStories) =>
      prevStories.filter((s) => {
        return s !== story
      }),
    )
  }

  const moveStoryUp = (index: number) => {
    if (index <= 0) return
    const newStoriesList = [...storiesList]
    ;[newStoriesList[index - 1], newStoriesList[index]] = [
      newStoriesList[index],
      newStoriesList[index - 1],
    ]
    setStoriesList(newStoriesList)
  }
  const moveStoryDown = (index: number) => {
    if (index >= storiesList.length - 1) return
    const newStoriesList = [...storiesList]
    ;[newStoriesList[index], newStoriesList[index + 1]] = [
      newStoriesList[index + 1],
      newStoriesList[index],
    ]
    setStoriesList(newStoriesList)
  }

  return (
    <>
      <CTable striped className={classNames('align-middle', 'table-hover', 'mb-0')}>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell className={classNames('text-start', 'py-4')}>#</CTableHeaderCell>
            <CTableHeaderCell className={classNames('text-start', 'py-4')}>Тип</CTableHeaderCell>
            <CTableHeaderCell className={classNames('text-start', 'py-4')}>
              Заголовок
            </CTableHeaderCell>
            <CTableHeaderCell className={classNames('text-end', 'py-4')}>
              Редактировать
            </CTableHeaderCell>
            <CTableHeaderCell className={classNames('text-end', 'py-4')}>Вниз</CTableHeaderCell>
            <CTableHeaderCell className={classNames('text-end', 'py-4')}>Вверх</CTableHeaderCell>
            <CTableHeaderCell className={classNames('text-end', 'pe-2', 'py-4')}>
              Удалить
            </CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {storiesList.map((story, index) => (
            <CTableRow key={story.id || story.tempId || index}>
              <CTableDataCell className="text-start">{index + 1}</CTableDataCell>
              <CTableDataCell className="text-start">{setStoryType(story.type)}</CTableDataCell>
              <CTableDataCell className="text-start">
                {story.title ? story.title : 'Отсутствует'}
              </CTableDataCell>
              <CTableDataCell className="text-end">
                <CButton
                  color="primary"
                  onClick={() => {
                    setIsEdit(true)
                    setCurrentStory(story ? story : null)
                    setOpenStoryPopup(true)
                  }}
                >
                  Редактировать
                </CButton>
              </CTableDataCell>
              <CTableDataCell className="text-end">
                <CIcon
                  icon={cilArrowBottom}
                  size="xl"
                  style={{ cursor: 'pointer' }}
                  onClick={() => moveStoryDown(index)}
                />
              </CTableDataCell>
              <CTableDataCell className="text-end">
                <CIcon
                  icon={cilArrowTop}
                  size="xl"
                  style={{ cursor: 'pointer' }}
                  onClick={() => moveStoryUp(index)}
                />
              </CTableDataCell>
              <CTableDataCell className={classNames('text-end', 'pe-0')}>
                <CButton color="primary" onClick={() => handleStoryDelete(story)}>
                  Удалить
                </CButton>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
      <StoryPopup
        popup={popup}
        isEdit={[isEdit, setIsEdit]}
        setStoriesList={setStoriesList}
        currentStory={[currentStory, setCurrentStory]}
        updateStories={updateStories}
      />
    </>
  )
}

export default StoriesTable
