import { Request, Response, NextFunction } from 'express';
import CustomError from '../utils/customError';
import updateSchema from '../validations/update';

function loginMiddleware(req: Request, res: Response, next: NextFunction) {
  const { username, email } = req.body;
  const { error } = updateSchema.validate({ username, email });

  if (error) throw new CustomError(400, error.message);
  next();
}

export default loginMiddleware;