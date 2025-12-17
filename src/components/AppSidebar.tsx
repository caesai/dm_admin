import { NavLink } from 'react-router-dom'
import {
  CCloseButton,
  CImage,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
} from '@coreui/react-pro'
import { AppSidebarNav } from './AppSidebarNav'
// sidebar nav config
import navigation from '../_nav'

import { useAtom } from 'jotai'
import { appAtom } from 'src/atoms/appAtom.ts'

const AppSidebar = () => {
  const [appState, setAppState] = useAtom(appAtom)

  return (
    <CSidebar
      className="border-end"
      colorScheme={appState.theme}
      position="fixed"
      unfoldable={appState.sidebarUnfoldable}
      visible={appState.sidebarShow}
      onVisibleChange={(visible) => {
        setAppState((prev) => ({ ...prev, sidebarShow: visible }))
      }}
    >
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand as={NavLink} to="/">
          <CImage className="w-100" src={'logo.svg'} />
        </CSidebarBrand>
        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => setAppState((prev) => ({ ...prev, sidebarShow: false }))}
        />
      </CSidebarHeader>
      <AppSidebarNav items={navigation} />
      <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler
          onClick={() =>
            setAppState((prev) => ({ ...prev, sidebarUnfoldable: !appState.sidebarUnfoldable }))
          }
        />
      </CSidebarFooter>
    </CSidebar>
  )
}

export default AppSidebar
