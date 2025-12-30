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
import { Dispatch, SetStateAction } from 'react'
import { IText } from 'src/types/Texts.ts'
import { renderHTMLContent } from 'src/utils.tsx'

interface TextsTableProps {
  setTextId: Dispatch<SetStateAction<number | null>>
  texts: IText[]
}

export const TextsTable = ({ setTextId, texts }: TextsTableProps) => {
  return (
    <CTable striped className={classNames('align-middle', 'table-hover', 'mb-0')}>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell className={classNames('text-start', 'pb-3')}>Описание</CTableHeaderCell>
          <CTableHeaderCell className={classNames('text-center', 'pb-3')}>Текст</CTableHeaderCell>
          <CTableHeaderCell className={classNames('text-start', 'pb-3')}>
            Категория
          </CTableHeaderCell>
          <CTableHeaderCell className={classNames('text-center', 'pb-3')}>Тип</CTableHeaderCell>
          <CTableHeaderCell className={classNames('text-end', 'pe-3', 'pb-3')}>
            Редактировать
          </CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody className={classNames('border-top')}>
        {texts.map((text) => (
          <CTableRow key={text.id}>
            <CTableDataCell className="text-start">{text.description}</CTableDataCell>
            <CTableDataCell className="text-center">
              {renderHTMLContent(text.content)}
            </CTableDataCell>
            <CTableDataCell className="text-start">{text.category}</CTableDataCell>
            <CTableDataCell className="text-start">{text.type}</CTableDataCell>
            <CTableDataCell className={classNames('text-end')}>
              <CButton color={'primary'} onClick={() => setTextId(text.id)}>
                Редактировать
              </CButton>
            </CTableDataCell>
          </CTableRow>
        ))}
      </CTableBody>
    </CTable>
  )
}
