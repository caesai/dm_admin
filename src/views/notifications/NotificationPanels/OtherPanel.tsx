import classNames from 'classnames'
import {
  CButton,
  CCard,
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
import { renderHTMLContent } from 'src/utils.tsx'

const OtherPanel: FC<{
  setTextId: Dispatch<SetStateAction<number | null>>
  texts: IText[]
}> = ({ setTextId, texts }) => {
  return (
    <CTabPanel itemKey="other">
      <CCard className={classNames('p-3', 'border-0')}>
        <CTable striped className={classNames('align-middle', 'table-hover', 'mb-0')}>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell className={classNames('text-start', 'pb-3')}>Имя</CTableHeaderCell>
              <CTableHeaderCell className={classNames('text-center', 'pb-3')}>
                Текст
              </CTableHeaderCell>
              <CTableHeaderCell className={classNames('text-end', 'pe-2', 'pb-3')}>
                Редактировать
              </CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody className={classNames('border-top')}>
            {texts.map((text) => (
              <CTableRow key={text.id}>
                <CTableDataCell className="text-start">{text.name}</CTableDataCell>
                <CTableDataCell className="text-center">
                  {renderHTMLContent(text.content)}
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
      </CCard>
    </CTabPanel>
  )
}

export default OtherPanel
