import AbstractODM from './AbstractODM'
import { type IJuice } from '../interfaces/juice.interface'
import { Schema } from 'mongoose'
import moment from 'moment-timezone'

class JuiceODM extends AbstractODM<IJuice> {
  constructor() {
    const schema = new Schema({
      flavor: { type: String, required: true },
      size: { type: String, required: true },
      price: { type: Number, required: true },
      description: { type: String, required: true },
      created_at: {
        type: String,
        default: moment().tz('America/Sao_Paulo').format('DD/MM/YYYY HH:mm:ss')
      },
      updated_at: {
        type: String,
        default: moment().tz('America/Sao_Paulo').format('DD/MM/YYYY HH:mm:ss')
      }
    }, { versionKey: false })

    super(schema, 'Juice')
  }

  public async insertMany(juices: IJuice[]): Promise<IJuice[]> {
    const newJuices = await this.model.insertMany(juices)
    return newJuices
  }

  public async countJuices(): Promise<number> {
    const count = await this.model.countDocuments()
    return count
  }
}

export default JuiceODM
