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

export interface IConfirmation {
  id: number
  title: string
  text: string
  address: string
}
