import { ElementType, JSX } from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilBuilding,
  cilCash,
  cilCircle,
  cilHistory,
  cilHome,
  cilLink,
  cilList,
  cilMonitor,
  cilPeople,
  cilRestaurant,
  cilSettings,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react-pro'
import { LuChefHat } from 'react-icons/lu'

export type Badge = {
  color: string
  text: string
}

export type NavItem = {
  badge?: Badge
  component: string | ElementType
  href?: string
  icon?: string | JSX.Element
  items?: NavItem[]
  name: string | JSX.Element
  to?: string
}

const _nav: NavItem[] = [
  {
    component: CNavItem,
    name: 'Главная',
    to: '/dashboard',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Пользователи',
  },
  {
    component: CNavItem,
    name: 'Пользователи',
    to: '/users',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Администраторы',
    to: '/administrators',
    icon: <CIcon icon={cilMonitor} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Коллекции',
  },
  {
    component: CNavItem,
    name: 'Рестораны',
    to: '/restaurants',
    icon: <CIcon icon={cilRestaurant} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Шефы',
    to: '/chefs',
    icon: <LuChefHat className={'nav-icon'} style={{ fill: 'none' }} />,
  },
  {
    component: CNavItem,
    name: 'Брони',
    to: '/booking',
    icon: <CIcon icon={cilCash} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Билеты',
    to: '/tickets',
    icon: <CIcon icon={cilCash} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Словари',
    icon: <CIcon icon={cilList} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Города',
        to: '/dicts/cities',
        icon: <CIcon icon={cilBuilding} customClassName={'nav-icon'} />,
      },
      {
        component: CNavItem,
        name: 'Метро',
        to: '/dicts/metro',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Истории',
    to: '/stories',
    icon: <CIcon icon={cilHistory} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Настройки',
    to: '/settings',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Бот',
  },
  {
    component: CNavItem,
    name: 'Инвайт-ссылки',
    to: '/invite-links',
    icon: <CIcon icon={cilLink} customClassName="nav-icon" />, // используйте подходящий икон компонент
  },
  {
    component: CNavItem,
    name: 'Рассылка',
    to: '/notifications',
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />, // используйте подходящий икон компонент
  },
]

export default _nav
