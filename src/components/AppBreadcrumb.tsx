import { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { CBreadcrumb, CBreadcrumbItem } from '@coreui/react-pro'

import routes from '../routes'
import type { Route } from '../routes'

type Breadcrumb = {
  pathname?: string
  name?: boolean | string | ReactNode
  active?: boolean
}

const getRouteName = (pathname: string, routes: Route[]) => {
  const currentRoute = routes.find((route) => route.path === pathname)
  return currentRoute ? currentRoute.name : false
}

const getBreadcrumbs = (location: string) => {
  const breadcrumbs: Breadcrumb[] = []
  location.split('/').reduce((prev, curr, index, array) => {
    const currentPathname = `${prev}/${curr}`
    const routeName = getRouteName(currentPathname, routes)
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    routeName &&
      breadcrumbs.push({
        pathname: currentPathname,
        name: routeName,
        active: index + 1 === array.length ? true : false,
      })
    return currentPathname
  })
  return breadcrumbs
}

const AppBreadcrumb = () => {
  const currentLocation = useLocation().pathname
  const { t } = useTranslation()
  const breadcrumbs = getBreadcrumbs(currentLocation)

  return (
    <CBreadcrumb className="m-0">
      <CBreadcrumbItem href="/">{t('home')}</CBreadcrumbItem>
      {breadcrumbs.map((breadcrumb, index) => {
        return (
          <CBreadcrumbItem
            {...(breadcrumb.active ? { active: true } : { href: breadcrumb.pathname })}
            key={index}
          >
            {breadcrumb.name}
          </CBreadcrumbItem>
        )
      })}
    </CBreadcrumb>
  )
}

export default AppBreadcrumb
