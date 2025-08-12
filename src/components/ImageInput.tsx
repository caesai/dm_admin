import classNames from 'classnames'
import CIcon from '@coreui/icons-react'
import { cilImagePlus } from '@coreui/icons'
import { ChangeEventHandler, FC } from 'react'

const ImageInput: FC<{
  onChange: ChangeEventHandler
}> = ({ onChange }) => {
  return (
    <label
      className={classNames(
        'd-flex',
        'align-items-center',
        'border',
        'rounded',
        'h-100',
        'px-3',
        'py-1',
      )}
      style={{ cursor: 'pointer' }}
    >
      <CIcon icon={cilImagePlus} />
      <input type="file" accept="image/*" className="d-none" onChange={onChange} />
    </label>
  )
}
export default ImageInput
