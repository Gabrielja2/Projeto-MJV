import { type IOrder } from '../interfaces/order.interface'

export default class Order {
  protected id?: string
  protected username: string
  protected quantity: number
  protected flavor: string
  protected price: number
  protected total_price: number
  protected created_at?: string | Date | undefined
  protected updated_at?: string | Date | undefined

  constructor(order: IOrder) {
    this.id = order.id
    this.username = order.username
    this.quantity = order.quantity
    this.flavor = order.flavor
    this.price = order.price
    this.total_price = order.total_price
    this.created_at = order.created_at
    this.updated_at = order.updated_at
  }

  get _id(): string | undefined {
    return this.id
  }

  set _id(value: string | undefined) {
    this.id = value
  }

  get _username(): string {
    return this.username
  }

  set _username(value: string) {
    this.username = value
  }

  get _quantity(): number {
    return this.quantity
  }

  set _quantity(value: number) {
    this.quantity = value
  }

  get _flavor(): string {
    return this.flavor
  }

  set _flavor(value: string) {
    this.flavor = value
  }

  get _price(): number {
    return this.price
  }

  set _price(value: number) {
    this.price = value
  }

  get _total_price(): number {
    return this.total_price
  }

  set _total_price(value: number) {
    this.total_price = value
  }

  get _created_at(): string | Date | undefined {
    return this.created_at
  }

  set _created_at(value: string | Date | undefined) {
    this.created_at = value
  }

  get _updated_at(): string | Date | undefined {
    return this.updated_at
  }

  set _updated_at(value: string | Date | undefined) {
    this.updated_at = value
  }
}
