import { Request, Response, NextFunction } from 'express';
import CustomError from '../utils/customError';
import registerSchema from '../validations/register.schema';

function registerMiddleware(req: Request, res: Response, next: NextFunction) {
  const { email, password, username } = req.body;
  const { error } = registerSchema.validate({ email, password, username });

  if (error) throw new CustomError(400, error.message);
  next();
}

export default registerMiddleware;