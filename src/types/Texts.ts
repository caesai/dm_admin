export interface IText {
  id: number
  name: string
  type: string
  content: string
  category: string
  is_hidden: boolean
  created_at: string
  updated_at: string
  description: string
}

export const ITextInitial: IText = {
  id: 0,
  name: '',
  type: '',
  description: '',
  category: '',
  content: '',
  created_at: '',
  updated_at: '',
  is_hidden: false,
}

export interface IConfirmation {
  id: number
  title: string
  text: string
  address: string
}
