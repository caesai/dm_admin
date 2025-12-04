import { CCard, CCardBody, CSmartTable } from '@coreui/react-pro'
import { Item } from '@coreui/react-pro/src/components/smart-table/types'
import { ILogs } from 'src/types/Logs.ts'
import { useState } from 'react'
import { LogsPopup } from 'src/views/users/UserPageViews/Modals/LogsPopup.tsx'

interface Props {
  logs: ILogs[]
}

const formatDateTime = (dateString: string) => {
  if (!dateString) return '-'

  const date = new Date(dateString)
  return isNaN(date.getTime()) ? '-' : date.toLocaleString('ru-RU')
}

export const UserLogs = ({ logs }: Props) => {
  const [currentLogs, setCurrentLogs] = useState<ILogs | null>(null)

  const cols = [
    {
      key: 'id',
      label: 'ID',
      _props: { scope: 'col' },
    },
    {
      key: 'description',
      label: 'Описание',
      _props: { scope: 'col' },
    },
    {
      key: 'category',
      label: 'Категория',
      _props: { scope: 'col' },
    },
    {
      key: 'action',
      label: 'Действие',
      _props: { scope: 'col' },
    },
    {
      key: 'sent_message',
      label: 'Сообщение',
      _props: { scope: 'col' },
    },
    {
      key: 'created_at',
      label: 'Время',
      _props: { scope: 'col' },
    },
  ]

  return (
    <>
      <LogsPopup logs={[currentLogs, setCurrentLogs]} />
      {logs.length > 0 ? (
        <CSmartTable
          columns={cols}
          items={logs}


          clickableRows
          onRowClick={(item: Item) => setCurrentLogs(item as ILogs)}
          tableHeadProps={{
            className: 'align-middle',
          }}
          tableProps={{
            striped: true,
            hover: true,
            className: 'align-middle',
          }}
          scopedColumns={{
            sent_message: (item: Item) => (
              <td>{item.sent_message !== null ? item.sent_message : 'Отсутствует'}</td>
            ),
            created_at: (item: Item) => <td>{formatDateTime(item.created_at)}</td>,
          }}
        />
      ) : (
        <CCard>
          <CCardBody>У пользователя нет логированных действий</CCardBody>
        </CCard>
      )}
    </>
  )
}
