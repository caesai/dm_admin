import { CCard, CCardBody, CCardHeader, CCardTitle } from '@coreui/react-pro'
import classNames from 'classnames'

interface TagStat {
  tag: string
  total: number
}

interface Props {
  tagStats: TagStat[]
}

export const UserTags = ({ tagStats }: Props) => {
  return (
    <CCard className="border h-100">
      <CCardHeader>
        <CCardTitle className="mb-0">Тэги</CCardTitle>
      </CCardHeader>
      <CCardBody className="d-grid gap-2">
        {!tagStats.length ? (
          <div className="text-muted">Клиент не использовал теги</div>
        ) : (
          <div className={classNames('d-flex', 'flex-column', 'justify-content-between')}>
            {tagStats.map((tag) => (
              <span className="d-flex align-items-center justify-content-between" key={tag.tag}>
                <strong>{tag.tag}:</strong> {tag.total}
              </span>
            ))}
          </div>
        )}
      </CCardBody>
    </CCard>
  )
}
