import { JSX, ReactNode } from 'react'
import PropTypes from 'prop-types'
import { CNav, CNavItem, CNavLink, CTabContent, CTabPane } from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { cilCode, cilMediaPlay } from '@coreui/icons'

const DocsExample = (props: {
  children: ReactNode
  href: string
  tabContentClassName?: string
}): JSX.Element => {
  const { children, href, tabContentClassName } = props

  const _href = `https://coreui.io/react/docs/${href}`

  return (
    <div className="example">
      <CNav variant="underline-border">
        <CNavItem>
          <CNavLink href="#" active>
            <CIcon icon={cilMediaPlay} className="me-2" />
            Preview
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href={_href} target="_blank">
            <CIcon icon={cilCode} className="me-2" />
            Code
          </CNavLink>
        </CNavItem>
      </CNav>
      <CTabContent className={`rounded-bottom ${tabContentClassName ? tabContentClassName : ''}`}>
        <CTabPane className="p-3 preview" visible>
          {children}
        </CTabPane>
      </CTabContent>
    </div>
  )
}

DocsExample.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
  tabContentClassName: PropTypes.string,
}

export default DocsExample
