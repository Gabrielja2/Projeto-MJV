import { type Request, type Response, type NextFunction } from 'express'
import CustomError from '../utils/customError'
import orderSchema from '../validations/order.schema'

function orderMiddleware(req: Request, _res: Response, next: NextFunction): void {
  const { quantity, flavor, size } = req.body
  const { error } = orderSchema.validate({ quantity, flavor, size })

  if (error) throw new CustomError(400, error.message)
  next()
}

export default orderMiddleware
