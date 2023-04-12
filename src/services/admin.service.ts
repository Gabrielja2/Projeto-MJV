import User from '../domains/user'
import { type IUser } from '../interfaces/user.interface'
import type UserODM from '../models/userODM'
import CustomError from '../utils/customError'

export default class JuiceService {
  constructor(
    private readonly userODM: UserODM
  ) { }

  public async create(user: IUser): Promise<User> {
    const hasUserByEmail = await this.userODM.findOne({ email: user.email })
    const hasUserByName = await this.userODM.findOne({ username: user.username })

    if (hasUserByEmail ?? hasUserByName) {
      throw new CustomError(409, 'User already registered')
    }

    const createdUser = await this.userODM.create({
      email: user.email,
      username: user.username,
      password: user.password,
      role: user.role || 'customer'
    })

    return new User(createdUser)
  }
}
