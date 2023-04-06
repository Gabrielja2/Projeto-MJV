import Juice from '../domains/juice'
import { type IJuice } from '../interfaces/juice.interface'
import type JuiceODM from '../models/juiceODM'
import CustomError from '../utils/customError'

export default class JuiceService {
  constructor(
    private readonly juiceODM: JuiceODM
  ) { }

  public create = async (juice: IJuice): Promise<Juice> => {
    const hasJuice = await this.juiceODM.findOne({
      flavor: juice.flavor,
      size: juice.size
    })

    if (hasJuice) {
      throw new CustomError(409, 'Juice already registered')
    }

    const createdJuice = await this.juiceODM.create({
      flavor: juice.flavor,
      size: juice.size,
      price: juice.price,
      description: juice.description
    })
    return new Juice(createdJuice)
  }

  public getAll = async (): Promise<Juice[]> => {
    const juices = await this.juiceODM.getAll()

    return juices.map((juice) => new Juice(juice))
  }

  public update = async (id: string, juice: IJuice): Promise<Juice> => {
    const updatedJuice = await this.juiceODM.updateById(id, juice)
    if (updatedJuice) {
      return new Juice(updatedJuice)
    }
    throw new CustomError(404, 'Juice not found')
  }

  public delete = async (id: string): Promise<{ message: string }> => {
    const juice = await this.juiceODM.getById(id)

    if (juice) {
      await this.juiceODM.deleteById(id)
      return { message: 'Juice deleted successfully' }
    }

    throw new CustomError(404, 'Juice not found')
  }

  public getById = async (id: string): Promise<Juice> => {
    const juice = await this.juiceODM.getById(id)

    if (juice) {
      return new Juice(juice)
    }

    throw new CustomError(404, 'Juice not found')
  }
};
