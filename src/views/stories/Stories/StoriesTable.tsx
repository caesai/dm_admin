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
import StoryPopup from 'src/views/stories/Stories/StoryPopup.tsx'

const StoriesTable: FC<{
  popup: [boolean, Dispatch<SetStateAction<boolean>>]
}> = ({ popup }) => {
  const [, setOpenStoryPopup] = popup
  const [isEdit, setEdit] = useState(false)
  return (
    <>
      <CTable striped className={classNames('align-middle', 'table-hover', 'mb-0')}>
        <CTableHead>
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
        </CTableHead>
        <CTableBody>
          <CTableRow>
            <CTableDataCell className="text-start">132</CTableDataCell>
            <CTableDataCell className="text-start">Компонент</CTableDataCell>
            <CTableDataCell className="text-start">Отсутствует</CTableDataCell>
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
        </CTableBody>
      </CTable>
      <StoryPopup popup={popup} isEdit={[isEdit, setEdit]} />
    </>
  )
}

export default StoriesTable
