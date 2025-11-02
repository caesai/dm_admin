export type StoryType = 'image' | 'video' | 'component'

export interface IStory {
  id?: number
  tempId?: string
  type: StoryType
  component_type: number | null
  duration: number | null
  url: string | null
  title: string | null
  description: string | null
  button_url: string | null
  button_text: string | null
  button_color: string | null
  order_index: number
  views_count: number
}

export interface IStoriesBlock {
  id?: number | null
  name: string
  active: boolean
  stories: IStory[]
  thumbnail?: string | null
  cities: number[]
  users: number[]
}
