import { type Request, type Response, type NextFunction } from 'express'
import type JuiceService from '../services/juice.service'

export default class JuiceController {
  constructor(private readonly _service: JuiceService) { }

  public create = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const juice = req.body
      const newJuice = await this._service.create(juice)

      return res.status(201).json(newJuice)
    } catch (error) {
      next(error)
    }
  }

  public getAll = async (_req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const juices = await this._service.getAll()

      return res.status(200).json(juices)
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

  public update = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const { id } = req.params
      const juice = req.body
      const updatedJuice = await this._service.update(id, juice)

      return res.status(200).json(updatedJuice)
    } catch (error) {
      next(error)
    }
  }

  public getById = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const { id } = req.params
      const juice = await this._service.getById(id)

      return res.status(200).json(juice)
    } catch (error) {
      next(error)
    }
  }
}
