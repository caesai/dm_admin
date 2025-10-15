export interface ILogs {
  id: number
  description: string
  category: string
  action: string
  sent_message: string | null
  created_at: string
  request_data?: string | null
  response_data?: string | null
  user_id: number
}
