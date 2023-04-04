import dotenv from 'dotenv/config';
import { verify, sign, JwtPayload, SignOptions } from 'jsonwebtoken';
import { ILogin } from '../interfaces/login.interface';
import CustomError from './customError';


const generateToken = (payload: ILogin) => {
  const jwtconfig = {
    expiresIn: '1h',
  };

  const token = sign({ payload }, 'jwt_secret', jwtconfig) as SignOptions;

  return token;
};

export const decodeToken = (token: string) => {
  try {
    const decodedtoken = verify(token, 'jwt_secret') as JwtPayload;

    return decodedtoken;
  } catch (error) {
    throw new CustomError(401, 'Token must be a valid token');
  }
};

export default generateToken;