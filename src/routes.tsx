import React, { LazyExoticComponent, FC, ReactNode } from 'react'

export type Route = {
  element?: LazyExoticComponent<FC>
  exact?: boolean
  name?: ReactNode
  path?: string
  routes?: Route[]
}

const UsersList = React.lazy(() => import('./views/users/UsersList'))
const UserPage = React.lazy(() => import('./views/users/UserPage'))
const AdminsPage = React.lazy(() => import('./views/admins/AdminsPage'))
const CitiesPage = React.lazy(() => import('./views/dicts/cities/CItyListPage.tsx'))
const RestaurantsPage = React.lazy(() => import('./views/restaurants/RestaurantsListPage.tsx'))
const RestaurantPage = React.lazy(() => import('./views/restaurants/RestaurantPage'))
const ChefsPage = React.lazy(() => import('./views/chefs/ChefsPage.tsx'))
const InviteLinksPage = React.lazy(() => import('./views/inviteLinks/InviteLinksPage.tsx'))
const NotificationsPage = React.lazy(() => import('./views/notifications/NotificationsPage.tsx'))

const routes: Route[] = [
  { path: '/', exact: true, name: 'Главная' },
  {
    path: '/users',
    name: 'Пользователи',
    element: UsersList,
    exact: true,
  },
  { path: '/users/:id', name: 'Пользователь', exact: true, element: UserPage },
  {
    path: '/administrators',
    name: 'Администраторы',
    exact: true,
    element: AdminsPage,
  },
  {
    path: '/chefs',
    name: 'Шефы',
    element: ChefsPage,
  },
  {
    path: '/dicts/cities',
    name: 'Города',
    element: CitiesPage,
  },
  {
    path: '/restaurants',
    name: 'Рестораны',
    element: RestaurantsPage,
  },
  {
    path: '/restaurants/:id',
    name: 'Ресторан',
    element: RestaurantPage,
  },
  {
    path: '/invite-links',
    name: 'Инвайт ссылки',
    exact: true,
    element: InviteLinksPage,
  },
  {
    path: '/notifications',
    name: 'Уведомления',
    exact: true,
    element: NotificationsPage,
  },
]

export default routes
