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
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import StoryPopup from 'src/views/stories/Stories/StoryPopup.tsx'
import { IStory, StoryType } from 'src/types/Stories.ts'
import { getStoriesList } from 'src/dataProviders/stories.ts'

const StoriesTable: FC<{
  popup: [boolean, Dispatch<SetStateAction<boolean>>]
  stories: [IStory[], Dispatch<SetStateAction<IStory[]>>]
  blockId?: number
}> = ({ popup, stories, blockId }) => {
  const [, setOpenStoryPopup] = popup
  const [isEdit, setEdit] = useState(false)
  const [storiesList, setStoriesList] = stories

  const setStoryType = (type: StoryType) => {
    switch (type) {
      case 'IMAGE':
        return 'Изображение'
      case 'VIDEO':
        return 'Видео'
      case 'COMPONENT':
        return 'Компонент'
    }
  }

  useEffect(() => {
    if (blockId) {
      getStoriesList(blockId).then((res) => setStoriesList(res.data))
    }
  }, [])
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
          {storiesList.map((story) => (
            <CTableRow key={story.id}>
              <CTableDataCell className="text-start">{story.id ? story.id : 'Нет'}</CTableDataCell>
              <CTableDataCell className="text-start">{setStoryType(story.type)}</CTableDataCell>
              <CTableDataCell className="text-start">
                {story.title ? story.title : 'Отсутствует'}
              </CTableDataCell>
              <CTableDataCell className="text-end">
                <CButton
                  color="primary"
                  onClick={() => {
                    setEdit(true)
                    setOpenStoryPopup(true)
                  }}
                >
                  Редактировать
                </CButton>
              </CTableDataCell>
              <CTableDataCell className="text-end">
                <CIcon icon={cilArrowBottom} size="xl" style={{ cursor: 'pointer' }} />
              </CTableDataCell>
              <CTableDataCell className="text-end">
                <CIcon icon={cilArrowTop} size="xl" style={{ cursor: 'pointer' }} />
              </CTableDataCell>
              <CTableDataCell className={classNames('text-end', 'pe-0')}>
                <CButton color="primary">Удалить</CButton>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
      <StoryPopup popup={popup} isEdit={[isEdit, setEdit]} setStoriesList={setStoriesList} />
    </>
  )
}

export default StoriesTable
