export interface IJuice {
  id?: string
  flavor: string
  size: string
  price: number
  description: string
  created_at?: string | Date
  updated_at?: string | Date
}
