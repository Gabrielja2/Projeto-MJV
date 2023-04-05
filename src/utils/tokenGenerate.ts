import { verify, sign, type JwtPayload, type SignOptions } from 'jsonwebtoken'
import { type ILogin } from '../interfaces/login.interface'
import CustomError from './customError'
import fs from 'fs'
import path from 'path'

const jwtKey = fs.readFileSync(path.resolve(__dirname, '../../jwt.evaluation.key'), 'utf-8')

const generateToken = (payload: ILogin): SignOptions => {
  const jwtconfig = {
    expiresIn: '1h'
  }

  const token = sign({ payload }, jwtKey, jwtconfig) as SignOptions
  return token
}

export const decodeToken = (token: string): JwtPayload => {
  try {
    const decodedtoken = verify(token, jwtKey) as JwtPayload
    return decodedtoken
  } catch (error) {
    throw new CustomError(401, 'Token must be a valid token')
  }
}

export default generateToken
