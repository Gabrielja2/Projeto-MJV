import Juice from '../domains/juice'
import JuiceODM from '../models/juiceODM'
import CustomError from '../utils/customError'
import { type IJuice } from '../interfaces/juice.interface'

export default class JuiceService {
  private readonly createJuiceODM = new JuiceODM()

  private readonly createJuiceDomain = (juice: IJuice): Juice | null => {
    if (juice) return new Juice(juice)
    return null
  }

  public create = async ({ flavor, size, price, description }: IJuice): Promise<Juice | null> => {
    const hasJuice = await this.createJuiceODM.findOne({ flavor, size })

    if (hasJuice) throw new CustomError(409, 'Juice already registered')

    const juice = await this.createJuiceODM.create({ flavor, size, price, description })
    return this.createJuiceDomain(juice)
  }

  public show = async (): Promise<IJuice[] | null> => {
    return await this.createJuiceODM.getAll()
  }

  public update = async (id: string, { flavor, description, size, price }: IJuice): Promise<Juice | { message: string }> => {
    const updatedJuice = await this.createJuiceODM.updateById(id, { flavor, description, size, price })
    if (updatedJuice) {
      this.createJuiceDomain(updatedJuice)
      return { message: 'Juice updated' }
    }
    throw new CustomError(404, 'Juice not found')
  }

  public delete = async (id: string): Promise<{ message: string }> => {
    const juice = await this.createJuiceODM.getById(id)

    if (juice) {
      await this.createJuiceODM.deleteById(id)
      return { message: 'Juice deleted successfully' }
    }

    throw new CustomError(404, 'Juice not found')
  }

  public showOne = async (id: string): Promise<Juice | null> => {
    const juice = await this.createJuiceODM.getById(id)

    if (!juice) {
      throw new CustomError(404, 'Juice not found')
    }
    return this.createJuiceDomain(juice)
  }
};
