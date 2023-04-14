export interface IOrder {
  id?: string
  username: string
  quantity: number
  flavor: string
  size: string
  price: number
  total_price: number
  created_at?: string | Date
  updated_at?: string | Date
}
