import { type IOrder } from '../interfaces/order.interface'
import { type IJuice } from '../interfaces/juice.interface'
import Order from '../domains/order'
import type OrderODM from '../models/orderODM'
import type JuiceODM from '../models/juiceODM'
import CustomError from '../utils/customError'

export default class OrderService {
  constructor(
    private readonly orderODM: OrderODM,
    private readonly juiceODM: JuiceODM
  ) { }

  private readonly calculateTotalPrice = (juice: IJuice, quantity: number): number => {
    return juice.price * quantity
  }

  public create = async (username: string, orderData: IOrder): Promise<Order> => {
    const juice = await this.juiceODM.findOne({ flavor: orderData.flavor, size: orderData.size })

    if (!juice) {
      throw new CustomError(404, 'Juice does not exist')
    }

    const totalPrice = this.calculateTotalPrice(juice, orderData.quantity)
    const order = await this.orderODM.create({ ...orderData, username, price: juice.price, total_price: totalPrice })

    return new Order(order)
  }

  public getAll = async (): Promise<Order[]> => {
    const orders = await this.orderODM.getAll()
    return orders.map((order) => new Order(order))
  }
}
