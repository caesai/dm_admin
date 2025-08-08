import { CButton } from '@coreui/react-pro'
import classNames from 'classnames'
import StoryTable from 'src/views/stories/StoriesTable.tsx'

const StoriesPage = () => {
  return (
    <>
      <div className={classNames('d-flex', 'justify-content-end')}>
        <CButton color="primary">+ Новый блок историй</CButton>
      </div>
      <StoryTable />
    </>
  )
}

export default StoriesPage
