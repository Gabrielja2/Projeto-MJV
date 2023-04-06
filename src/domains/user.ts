import { type IUser } from '../interfaces/user.interface'

export default class User {
  protected _id?: string
  protected _email: string
  protected _password: string
  protected _username: string
  protected _role: string

  constructor(user: IUser) {
    this._id = user.id
    this._email = user.email
    this._password = user.password
    this._username = user.username
    this._role = user.role
  }

  public get id(): string | undefined {
    return this._id
  }

  public set id(value: string | undefined) {
    this._id = value
  }

  public get email(): string {
    return this._email
  }

  public set email(value: string) {
    this._email = value
  }

  public get password(): string {
    return this._password
  }

  public set password(value: string) {
    this._password = value
  }

  public get username(): string {
    return this._username
  }

  public set username(value: string) {
    this._username = value
  }

  public get role(): string {
    return this._role
  }

  public set role(value: string) {
    this._role = value
  }
}
