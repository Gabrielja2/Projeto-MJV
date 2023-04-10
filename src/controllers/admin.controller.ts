import { type Request, type Response, type NextFunction } from 'express'
import type AdminService from '../services/admin.service'

export default class AdminController {
  constructor(private readonly _service: AdminService) { }

  public create = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const user = req.body
      const newUser = await this._service.create(user)

      return res.status(201).json(newUser)
    } catch (error) {
      next(error)
    }
  }
}
