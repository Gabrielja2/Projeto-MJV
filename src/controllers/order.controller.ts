import { type Request, type Response, type NextFunction } from 'express'
import type OrderService from '../services/order.service'

export default class UserController {
  constructor(private readonly _service: OrderService) { }

  public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { username } = res.locals.user.payload
      const newOrder = await this._service.create(username, req.body)

      res.status(201).json(newOrder)
    } catch (error) {
      next(error)
    }
  }

  public getAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const orders = await this._service.getAll()

      res.status(200).json(orders)
    } catch (error) {
      next(error)
    }
  }
};
