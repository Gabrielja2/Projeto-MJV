import { type IOrder } from '../interfaces/order.interface'

export default class Order {
  protected _id?: string
  protected _username: string
  protected _quantity: number
  protected _flavor: string
  protected _price: number
  protected _total_price: number
  protected _created_at?: Date

  constructor(order: IOrder) {
    this._id = order.id
    this._username = order.username
    this._quantity = order.quantity
    this._flavor = order.flavor
    this._price = order.price
    this._total_price = order.total_price
    this._created_at = order.created_at
  }

  get id(): string | undefined {
    return this._id
  }

  set id(value: string | undefined) {
    this._id = value
  }

  get username(): string {
    return this._username
  }

  set username(value: string) {
    this._username = value
  }

  get quantity(): number {
    return this._quantity
  }

  set quantity(value: number) {
    this._quantity = value
  }

  get flavor(): string {
    return this._flavor
  }

  set flavor(value: string) {
    this._flavor = value
  }

  get price(): number {
    return this._price
  }

  set price(value: number) {
    this._price = value
  }

  get total_price(): number {
    return this._total_price
  }

  set total_price(value: number) {
    this._total_price = value
  }

  get created_at(): Date | undefined {
    return this._created_at
  }

  set created_at(value: Date | undefined) {
    this._created_at = value
  }
}
