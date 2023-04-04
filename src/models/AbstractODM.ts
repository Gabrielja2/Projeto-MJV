import { type Model, model, models, type Schema, isValidObjectId } from 'mongoose'
import CustomError from '../utils/customError'
import { type IUser } from '../interfaces/user.interface'
import { type ILogin } from '../interfaces/login.interface'
import { type IUserUpdate } from '../interfaces/update.interface'
import { type IJuice } from '../interfaces/juice.interface'

abstract class AbstractODM<T> {
  protected model: Model<T>
  protected schema: Schema
  protected modelName: string

  constructor(schema: Schema, modelName: string) {
    this.schema = schema
    this.modelName = modelName
    this.model = models[this.modelName] || model(this.modelName, this.schema)
  }

  public async create(body: T): Promise<T> {
    return await this.model.create({ ...body })
  }

  public async getAll(): Promise<T[]> {
    return await this.model.find({})
  }

  public async findOne(options: Partial<ILogin> | Partial<IJuice>): Promise<IUser | null> {
    return await this.model.findOne(options)
  }

  public async getById(id: string): Promise<T | null> {
    if (!isValidObjectId(id)) throw new CustomError(422, 'Invalid mongo id')
    return await this.model.findById(id)
  }

  public async updateById(id: string, body: IUserUpdate): Promise<T | null> {
    if (!isValidObjectId(id)) throw new CustomError(422, 'Invalid mongo id')
    return await this.model.findByIdAndUpdate(id, { ...body }, { new: true })
  }

  public async deleteById(id: string): Promise<T[] | null> {
    if (!isValidObjectId(id)) throw new CustomError(422, 'Invalid mongo id')
    return await this.model.findByIdAndDelete(id)
  }
}

export default AbstractODM
