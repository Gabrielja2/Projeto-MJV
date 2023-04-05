import { type Request, type Response, type NextFunction } from 'express'
import type JuiceService from '../services/juice.service'

export default class JuiceController {
  private readonly _service: JuiceService

  constructor(service: JuiceService) {
    this._service = service
  }

  public create = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const newJuice = await this._service.create(req.body)

      return res.status(201).json(newJuice)
    } catch (error) {
      next(error)
    }
  }

  public show = async (_req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const juices = await this._service.show()

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

  public update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params
      const updatedJuice = await this._service.update(id, req.body)

      res.status(200).json(updatedJuice)
    } catch (error) {
      next(error)
    }
  }

  public showOne = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const { id } = req.params
      const juice = await this._service.showOne(id)

      return res.status(200).json(juice)
    } catch (error) {
      next(error)
    }
  }
}
