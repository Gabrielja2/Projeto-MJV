import User from '../domains/user'
import { type ILogin } from '../interfaces/login.interface'
import { type IUser } from '../interfaces/user.interface'
import UserODM from '../models/userODM'
import CustomError from '../utils/customError'
import generateToken from '../utils/tokenGenerate'
import bcrypt from 'bcrypt'
import { type SignOptions } from 'jsonwebtoken'

export default class UserService {
  private readonly createUserODM = new UserODM()

  private readonly createUserDomain = (user: IUser): User | null => {
    if (user) return new User(user)
    return null
  }

  public login = async ({ email, password }: ILogin): Promise<SignOptions> => {
    const hasUser = await this.createUserODM.findOne({ email })
    if (!hasUser) throw new CustomError(404, 'User not found')

    const isPasswordValid = await bcrypt.compare(password, hasUser.password)
    if (!isPasswordValid) {
      throw new CustomError(400, 'Invalid password')
    }
    const token = generateToken(hasUser)
    return token
  }

  public create = async ({ email, username, password }: IUser): Promise<User | null> => {
    const hasUser = await this.createUserODM.findOne({ email })

    if (hasUser) throw new CustomError(409, 'User already registered')

    const user = await this.createUserODM.create({ email, username, password, role: 'customer' })
    return this.createUserDomain(user)
  }

  public show = async (): Promise<IUser[] | null> => {
    return await this.createUserODM.getAll()
  }

  public update = async (id: string, username: string, email: string): Promise<User | { message: string }> => {
    const updatedUser = await this.createUserODM.updateById(id, { username, email })
    if (updatedUser) {
      this.createUserDomain(updatedUser)
      return { message: 'User updated' }
    }
    throw new CustomError(404, 'User not found')
  }

  public delete = async (id: string): Promise<{ message: string }> => {
    const user = await this.createUserODM.getById(id)

    if (user) {
      await this.createUserODM.deleteById(id)
      return { message: 'User deleted successfully' }
    }

    throw new CustomError(404, 'User not found')
  }

  public showOne = async (id: string): Promise<User | null> => {
    const user = await this.createUserODM.getById(id)

    if (!user) {
      throw new CustomError(404, 'User not found')
    }
    return this.createUserDomain(user)
  }
};
