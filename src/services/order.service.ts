import { type IOrder } from '../interfaces/order.interface'
import { type IJuice } from '../interfaces/juice.interface'
import Order from '../domains/order'
import type OrderODM from '../models/orderODM'
import type JuiceODM from '../models/juiceODM'
import CustomError from '../utils/customError'
import type UserODM from '../models/userODM'

export default class OrderService {
  constructor(
    private readonly orderODM: OrderODM,
    private readonly juiceODM: JuiceODM,
    private readonly userODM: UserODM
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

  public getById = async (id: string): Promise<Order> => {
    const order = await this.orderODM.getById(id)

    return new Order(order as any)
  }

  public getOrderByUser = async (id: string): Promise<IOrder[]> => {
    const user = await this.userODM.getById(id)

    if (user) {
      const orders = await this.orderODM.getOrdersByUser(user.username)
      return orders
    }
    throw new CustomError(404, 'User not found')
  }

  public async update(id: string, order: IOrder): Promise<Order> {
    const existingOrder = await this.orderODM.getById(id)
    if (!existingOrder) throw new CustomError(400, 'Order not found')

    const juice = await this.juiceODM.findOne({ flavor: order.flavor, size: order.size })
    if (!juice) throw new CustomError(404, 'Juice not found')

    const totalPrice = this.calculateTotalPrice(juice, order.quantity)

    Object.assign(existingOrder, {
      flavor: order.flavor,
      quantity: order.quantity,
      size: order.size,
      price: juice.price,
      total_price: totalPrice
    })

    const updatedOrder = await this.orderODM.updateById(id, existingOrder)
    if (updatedOrder) return new Order(updatedOrder)

    throw new CustomError(404, 'Order not found')
  }

  public async delete(id: string): Promise<{ message: string }> {
    const order = await this.orderODM.getById(id)

    if (order) {
      await this.orderODM.deleteById(id)
      return { message: 'Order deleted successfully' }
    }

    throw new CustomError(404, 'Order not found')
  }
}
