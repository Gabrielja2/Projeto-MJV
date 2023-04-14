export interface IUser {
  id?: string
  email: string
  password: string
  username: string
  role: string
  created_at?: string | Date
  updated_at?: string | Date
}
