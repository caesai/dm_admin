import { CButton } from '@coreui/react-pro'
import classNames from 'classnames'

const StoriesPage = () => {
  return (
    <>
      <div className={classNames('d-flex', 'justify-content-end')}>
        <CButton color="primary">+ Новый блок историй</CButton>
      </div>
    </>
  )
}

export default StoriesPage
