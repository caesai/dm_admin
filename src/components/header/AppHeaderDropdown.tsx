import {
  CAvatar,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react-pro'
import { cilAccountLogout } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/8.jpg'
import { logout } from 'src/models/auth.model.ts'

const AppHeaderDropdown = () => {
  return (
    <CDropdown variant="nav-item" alignment="end">
      <CDropdownToggle className="py-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0">
        <CDropdownItem href="/login" onClick={logout}>
          <CIcon icon={cilAccountLogout} className="me-2" />
          Выйти
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
