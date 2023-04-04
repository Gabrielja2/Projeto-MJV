import { IUser } from '../interfaces/user.interface';

export default class User {
  protected id?: string;
  protected email: string;
  protected password: string;
  protected username: string;


  constructor(user: IUser) {
    this.id = user.id;
    this.email = user.email;
    this.password = user.password
    this.username = user.username;
  }
}