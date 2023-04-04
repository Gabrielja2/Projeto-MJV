import { Request, Response, NextFunction } from 'express';
import CustomError from '../utils/customError';
import { decodeToken } from '../utils/tokenGenerate';

function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new CustomError(401, "Token not found")
  }
  const decoded = decodeToken(authorization as string);
  res.locals.user = decoded;

  next();
}

export default authMiddleware;