import { type Request, type Response, type NextFunction } from 'express'
import CustomError from '../utils/customError'
import { decodeToken } from '../utils/tokenGenerate'

function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const { authorization } = req.headers

  if (!authorization) {
    throw new CustomError(401, 'Token not found')
  }
  const decoded = decodeToken(authorization)
  res.locals.user = decoded

  next()
}

export default authMiddleware
