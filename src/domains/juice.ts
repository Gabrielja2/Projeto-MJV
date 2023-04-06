import { type IJuice } from '../interfaces/juice.interface'

export default class Juice {
  protected _id?: string
  protected _flavor: string
  protected _size: string
  protected _price: number
  protected _description: string

  constructor(juice: IJuice) {
    this._id = juice.id
    this._flavor = juice.flavor
    this._size = juice.size
    this._price = juice.price
    this._description = juice.description
  }

  get id(): string | undefined {
    return this._id
  }

  set id(value: string | undefined) {
    this._id = value
  }

  get flavor(): string {
    return this._flavor
  }

  set flavor(value: string) {
    this._flavor = value
  }

  get size(): string {
    return this._size
  }

  set size(value: string) {
    this._size = value
  }

  get price(): number {
    return this._price
  }

  set price(value: number) {
    this._price = value
  }

  get description(): string {
    return this._description
  }

  set description(value: string) {
    this._description = value
  }
}
