import { IUser } from 'src/types/User.ts'

export interface IAdmin {
  id: number
  login: string
  is_active: boolean
  user?: IUser[]
}
