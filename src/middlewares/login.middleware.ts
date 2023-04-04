import { type Request, type Response, type NextFunction } from 'express'
import CustomError from '../utils/customError'
import loginSchema from '../validations/login.schema'

function loginMiddleware(req: Request, _res: Response, next: NextFunction): void {
  const { email, password } = req.body
  const { error } = loginSchema.validate({ email, password })

  if (error) throw new CustomError(400, error.message)
  next()
}

export default loginMiddleware
