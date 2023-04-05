import { type Request, type Response, type NextFunction } from 'express'
import CustomError from '../utils/customError'
import juiceSchema from '../validations/juice.schema'

function juiceMiddleware(req: Request, _res: Response, next: NextFunction): void {
  const { flavor, description } = req.body
  const { error } = juiceSchema.validate({ flavor, description })

  if (error) throw new CustomError(400, error.message)
  next()
}

export default juiceMiddleware
