import classNames from 'classnames'
import { CCard, CTabPanel } from '@coreui/react-pro'
import { Dispatch, FC, SetStateAction } from 'react'
import { IText } from 'src/types/Texts.ts'
import { TextsTable } from './components/TextsTable.tsx'

const OtherPanel: FC<{
  setTextId: Dispatch<SetStateAction<number | null>>
  texts: IText[]
}> = ({ setTextId, texts }) => {
  return (
    <CTabPanel itemKey="other">
      <CCard className={classNames('p-3', 'border-0')}>
        <TextsTable setTextId={setTextId} texts={texts} />
      </CCard>
    </CTabPanel>
  )
}

export default OtherPanel
