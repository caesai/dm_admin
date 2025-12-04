export interface ICommon {
  created_at: string
  updated_at: string
}

export interface IPagination {
  page: number
  per_page: number
  total?: number
}
