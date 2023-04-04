import User from '../domains/user';
import { ILogin } from '../interfaces/login.interface';
import { IUser } from '../interfaces/user.interface';
import UserODM from '../models/userODM';
import CustomError from '../utils/customError';
import generateToken from '../utils/tokenGenerate';
import bcrypt, { hash } from 'bcrypt';

export default class UserService {

  private createUserODM = new UserODM();

  private createUserDomain = (user: IUser) => {
    if (user) return new User(user);
    return null;
  };

  public login = async ({ email, password }: ILogin) => {
    const hasUser = await this.createUserODM.findOne({ email });
    if (!hasUser) throw new CustomError(404, 'User not found');

    const isPasswordValid = await bcrypt.compare(password, hasUser.password);
    if (!isPasswordValid) {
      throw new CustomError(400, 'Invalid password');
    }
    const token = generateToken(hasUser);
    return token;
  };

  public create = async ({ email, username, password }: IUser) => {
    const hasUser = await this.createUserODM.findOne({ email });

    if (hasUser) throw new CustomError(409, 'User already registered');

    const user = await this.createUserODM.create({ email, username, password });
    return this.createUserDomain(user);
  };

  public show = async () => {
    return this.createUserODM.getAll();
  };

  public update = async (id: string, username: string, email: string) => {
    const updatedUser = await this.createUserODM.updateById(id, { username, email });
    if (updatedUser) {
      this.createUserDomain(updatedUser);
      return { message: "User updated" }
    }
    throw new CustomError(404, 'User not found');
  };

  public delete = async (id: string) => {
    const user = await this.createUserODM.getById(id)

    if (user) {
      this.createUserODM.deleteById(id)
      return { message: "User deleted successfully" }
    }

    throw new CustomError(404, 'User not found');
  };

  public showOne = async (id: string) => {
    const user = await this.createUserODM.getById(id)

    if (!user) {
      throw new CustomError(404, 'User not found');
    }
    return this.createUserDomain(user);
  };
};