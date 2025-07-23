import classNames from 'classnames'
import {
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTabPanel,
} from '@coreui/react-pro'
import { Dispatch, FC, SetStateAction } from 'react'
import { IText } from 'src/types/Texts.ts'

const OtherPanel: FC<{
  setTextId: Dispatch<SetStateAction<number | null>>
  texts: IText[]
}> = ({ setTextId, texts }) => {
  return (
    <CTabPanel itemKey="other" className={classNames('bg-white', 'p-3')}>
      <CTable striped className={classNames('align-middle', 'table-hover', 'mb-0')}>
        <CTableHead>
          <CTableHeaderCell className={classNames('text-start', 'pb-3')}>Имя</CTableHeaderCell>
          <CTableHeaderCell className={classNames('text-center', 'pb-3')}>Текст</CTableHeaderCell>
          <CTableHeaderCell className={classNames('text-end', 'pe-2', 'pb-3')}>
            Редактировать
          </CTableHeaderCell>
        </CTableHead>
        <CTableBody className={classNames('border-top')}>
          {texts.map((text) => (
            <CTableRow key={text.id}>
              <CTableDataCell className="text-start">{text.name}</CTableDataCell>
              <CTableDataCell className="text-center">
                {text.content ? text.content : 'Текст отсутствует'}
              </CTableDataCell>
              <CTableDataCell className={classNames('text-end', 'pe-0')}>
                <CButton color={'primary'} onClick={() => setTextId(text.id)}>
                  Редактировать
                </CButton>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </CTabPanel>
  )
}

export default OtherPanel
