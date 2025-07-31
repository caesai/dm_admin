export interface IMailing {
  id: number
  text: string | null
  button_text: string | null
  button_url: string | null
  sent_count: number
  total_count: number
  created_at: number
}
