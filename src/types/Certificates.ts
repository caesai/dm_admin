export interface CertificateData {
  certificate_type: string
  value: string
  customer_id: number
  payment_id: number
  expired_at: string
  recipient_id: number
  recipient_name: string
  message: string
  receipt_point: number
  receipt_date: string
  id: string
  status: string
  created_at: string
  updated_at: string
  shared_at: string
}

export interface ICertificate {
  certificates: CertificateData[]
  total: number
  page: number
  per_page: number
}
