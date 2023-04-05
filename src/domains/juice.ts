import { type IJuice } from '../interfaces/juice.interface'

export default class Juice {
  protected id?: string
  protected flavor: string
  protected size: string
  protected price: number
  protected description: string

  constructor(juice: IJuice) {
    this.id = juice.id
    this.flavor = juice.flavor
    this.size = juice.size
    this.price = juice.price
    this.description = juice.description
  }
}
