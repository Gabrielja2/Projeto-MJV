import AbstractODM from './AbstractODM'
import { type IOrder } from '../interfaces/order.interface'
import { Schema } from 'mongoose'

class OrderODM extends AbstractODM<IOrder> {
  constructor() {
    const schema = new Schema({
      username: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      flavor: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      total_price: {
        type: Number,
        required: true
      },
      size: {
        type: String,
        required: true
      },
      created_at: {
        type: Date,
        default: Date.now
      }
    }, { versionKey: false })

    super(schema, 'Order')
  }
}

export default OrderODM
