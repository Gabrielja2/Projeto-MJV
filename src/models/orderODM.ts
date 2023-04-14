import AbstractODM from './AbstractODM'
import { type IOrder } from '../interfaces/order.interface'
import { Schema } from 'mongoose'
import moment from 'moment-timezone'

class OrderODM extends AbstractODM<IOrder> {
  constructor() {
    const schema = new Schema({
      username: { type: String, required: true },
      quantity: { type: Number, required: true },
      flavor: { type: String, required: true },
      price: { type: Number, required: true },
      total_price: { type: Number, required: true },
      size: { type: String, required: true },
      created_at: {
        type: String || Date,
        default: moment().tz('America/Sao_Paulo').format('DD/MM/YYYY HH:mm:ss')
      },
      updated_at: {
        type: String || Date,
        default: moment().tz('America/Sao_Paulo').format('DD/MM/YYYY HH:mm:ss')
      }
    }, { versionKey: false })

    super(schema, 'Order')
  }

  public async getOrdersByUser(username: string): Promise<IOrder[]> {
    const ordersByUser = await this.model.find({ username })

    return ordersByUser
  }
}

export default OrderODM
