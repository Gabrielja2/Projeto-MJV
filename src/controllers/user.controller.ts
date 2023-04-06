import { type Request, type Response, type NextFunction } from 'express'
import type UserService from '../services/user.service'

export default class UserController {
  constructor(private readonly _service: UserService) { }

  public login = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const { email, password } = req.body
      const token = await this._service.login(email, password)

      return res.status(200).json({ token })
    } catch (error) {
      next(error)
    }
  }

  public create = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const user = req.body
      const newUser = await this._service.create(user)

      return res.status(201).json(newUser)
    } catch (error) {
      next(error)
    }
  }

  public getAll = async (_req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const users = await this._service.getAll()

      return res.status(200).json(users)
    } catch (error) {
      next(error)
    }
  }

  public update = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const { id } = req.params
      const user = req.body
      const updatedUser = await this._service.update(id, user)

      return res.status(200).json(updatedUser)
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

  public getById = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const { id } = req.params
      const user = await this._service.getById(id)

      return res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }
};
