import { type Request, type Response, type NextFunction } from 'express'
import type OrderService from '../services/order.service'

export default class UserController {
  constructor(private readonly _service: OrderService) { }

  public create = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const { username } = res.locals.user.payload
      const newOrder = await this._service.create(username, req.body)

      return res.status(201).json(newOrder)
    } catch (error) {
      next(error)
    }
  }

  public getAll = async (_req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const orders = await this._service.getAll()

      return res.status(200).json(orders)
    } catch (error) {
      next(error)
    }
  }

  public getOrderByUser = async (_req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const user = res.locals.user.payload
      const order = await this._service.getOrderByUser(user)

      return res.status(200).json(order)
    } catch (error) {
      next(error)
    }
  }

  public update = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const { id } = req.params
      const order = req.body
      const updatedOrder = await this._service.update(id, order)

      return res.status(200).json(updatedOrder)
    } catch (error) {
      next(error)
    }
  }

  public delete = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const { id } = req.params
      const message = await this._service.delete(id)
      return res.status(200).json(message)
    } catch (error) {
      next(error)
    }
  }
};
