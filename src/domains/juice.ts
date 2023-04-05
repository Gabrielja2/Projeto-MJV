import { type IJuice } from '../interfaces/juice.interface'

export default class Juice {
  protected id?: string
  protected flavor: string
  protected description: string

  constructor(juice: IJuice) {
    this.id = juice.id
    this.flavor = juice.flavor
    this.description = juice.description
  }
}
