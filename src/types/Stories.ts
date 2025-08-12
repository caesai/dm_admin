export type StoryType = 'image' | 'video' | 'component'

export interface IStory {
  id?: number
  type: StoryType
  duration: number
  url: string | null
  title?: string | null
  description?: string | null
  button_url?: string | null
  button_text?: string | null
  button_color?: string | null
}

export interface IStoriesBlock {
  id?: number | null
  name: string
  active: boolean
  stories: IStory[]
  thumbnail?: string | null
  cities?: number[] | null
  users?: number[] | null
}
