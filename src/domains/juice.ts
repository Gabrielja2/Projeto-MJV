import { type IJuice } from '../interfaces/juice.interface'

export default class Juice {
  protected id?: string
  protected flavor: string
  protected size: string
  protected price: number
  protected description: string
  protected created_at?: string | Date
  protected updated_at?: string | Date

  constructor(juice: IJuice) {
    this.id = juice.id
    this.flavor = juice.flavor
    this.size = juice.size
    this.price = juice.price
    this.description = juice.description
    this.created_at = juice.created_at
    this.updated_at = juice.updated_at
  }

  get _id(): string | undefined {
    return this.id
  }

  set _id(value: string | undefined) {
    this.id = value
  }

  get _flavor(): string {
    return this.flavor
  }

  set _flavor(value: string) {
    this.flavor = value
  }

  get _size(): string {
    return this.size
  }

  set _size(value: string) {
    this.size = value
  }

  get _price(): number {
    return this.price
  }

  set _price(value: number) {
    this.price = value
  }

  get _description(): string {
    return this.description
  }

  set _description(value: string) {
    this.description = value
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
