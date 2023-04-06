import { type IUser } from '../interfaces/user.interface'

export default class User {
  protected id?: string
  protected email: string
  protected password: string
  protected username: string
  protected role: string

  constructor(user: IUser) {
    this.id = user.id
    this.email = user.email
    this.password = user.password
    this.username = user.username
    this.role = user.role
  }

  public get _id(): string | undefined {
    return this.id
  }

  public set _id(value: string | undefined) {
    this.id = value
  }

  public get _email(): string {
    return this.email
  }

  public set _email(value: string) {
    this.email = value
  }

  public get _password(): string {
    return this.password
  }

  public set _password(value: string) {
    this.password = value
  }

  public get _username(): string {
    return this.username
  }

  public set _username(value: string) {
    this.username = value
  }

  public get _role(): string {
    return this.role
  }

  public set _role(value: string) {
    this.role = value
  }
}
