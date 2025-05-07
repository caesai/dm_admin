export interface IPaymentBase {
  id: number
  total: number
  status: string
  yookassa_id?: string
  created_at: string
  updated_at: string
}
