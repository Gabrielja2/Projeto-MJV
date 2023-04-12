export interface IOrder {
  id?: string
  username: string
  quantity: number
  flavor: string
  size: string
  price: number
  total_price: number
  created_at?: Date
  updated_at?: Date
}
