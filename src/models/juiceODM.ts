import AbstractODM from './AbstractODM'
import { type IJuice } from '../interfaces/juice.interface'
import { Schema } from 'mongoose'

class JuiceODM extends AbstractODM<IJuice> {
  constructor() {
    const schema = new Schema({
      flavor: { type: String, required: true },
      description: { type: String, required: true }
    }, { versionKey: false })

    super(schema, 'Juice')
  }
}

export default JuiceODM
