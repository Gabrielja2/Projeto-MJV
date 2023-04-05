import { type Request, type Response, type NextFunction } from 'express'
import CustomError from '../utils/customError'
import juiceSchema, { juiceUpdateSchema } from '../validations/juice.schema'

function juiceMiddleware(req: Request, _res: Response, next: NextFunction): void {
  const { flavor, description, size, price } = req.body
  const { error } = juiceSchema.validate({ flavor, description, size, price })

  if (error) throw new CustomError(400, error.message)
  next()
}

export function juiceUpdateMiddleware(req: Request, _res: Response, next: NextFunction): void {
  const { flavor, description, size, price } = req.body
  const { error } = juiceUpdateSchema.validate({ flavor, description, size, price })

  if (error) throw new CustomError(400, error.message)
  next()
}

export default juiceMiddleware
