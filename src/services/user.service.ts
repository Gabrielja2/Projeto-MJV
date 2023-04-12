import User from '../domains/user'
import { type IUser } from '../interfaces/user.interface'
import type UserODM from '../models/userODM'
import CustomError from '../utils/customError'
import generateToken from '../utils/tokenGenerate'
import bcrypt from 'bcrypt'

export default class UserService {
  constructor(
    private readonly userODM: UserODM
  ) { }

  public async login(email: string, password: string): Promise<string> {
    const user = await this.userODM.findOne({ email })

    if (!user) {
      throw new CustomError(404, 'User not found')
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      throw new CustomError(400, 'Invalid password')
    }

    const token = generateToken(user)

    return token
  }

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
      role: 'customer'
    })

    return new User(createdUser)
  }

  public async getAll(): Promise<User[]> {
    const users = await this.userODM.getAll()

    return users.map((user) => new User(user))
  }

  public async update(id: string, user: IUser): Promise<User> {
    const hasUserByName = await this.userODM.getById(id)

    if (user.username === hasUserByName?.username) throw new CustomError(400, 'Username already in use')
    const updatedUser = await this.userODM.updateById(id, { username: user.username, email: user.email })

    if (user.email === hasUserByName?.email) throw new CustomError(400, 'Email already in use')

    if (updatedUser) {
      return new User(updatedUser)
    }
    throw new CustomError(404, 'User not found')
  }

  public async delete(id: string): Promise<{ message: string }> {
    const user = await this.userODM.getById(id)

    if (user) {
      await this.userODM.deleteById(id)
      return { message: 'User deleted successfully' }
    }

    throw new CustomError(404, 'User not found')
  }

  public async getById(id: string): Promise<User> {
    const user = await this.userODM.getById(id)

    if (user) {
      return new User(user)
    }
    throw new CustomError(404, 'User not found')
  }
};
