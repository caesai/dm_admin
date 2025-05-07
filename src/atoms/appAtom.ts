import { atom } from 'jotai'

export type State = {
  asideShow: boolean
  sidebarShow: boolean
  theme: 'light' | 'dark'
  sidebarUnfoldable: boolean
}

const initialState: State = {
  asideShow: false,
  sidebarShow: true,
  theme: 'light',
  sidebarUnfoldable: false,
}

export const appAtom = atom<State>(initialState)
