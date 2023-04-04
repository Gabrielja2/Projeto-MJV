import { type Request, type Response, type NextFunction } from 'express'
import CustomError from '../utils/customError'
import updateSchema from '../validations/update.schema'

function updateUserMiddleware(req: Request, _res: Response, next: NextFunction): void {
  const { username, email } = req.body
  const { error } = updateSchema.validate({ username, email })

  if (error) throw new CustomError(400, error.message)
  next()
}

export default updateUserMiddleware
