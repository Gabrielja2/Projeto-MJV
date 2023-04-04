import { Request, Response, NextFunction } from 'express';
import UserService from '../services/user.service';

export default class UserController {
  private _service: UserService;

  constructor(service: UserService) {
    this._service = service;
  }

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = await this._service.login(req.body);

      return res.status(200).json({ token });
    } catch (error) {
      next(error)
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newUser = await this._service.create(req.body);

      return res.status(201).json(newUser);
    } catch (error) {
      next(error)
    }
  };

  public show = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this._service.show();

      return res.status(200).json(users);
    } catch (error) {
      next(error)
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      const { username, email } = req.body;
      const updatedUser = await this._service.update(id, username, email);

      return res.status(200).json(updatedUser);
    } catch (error) {
      next(error)
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      const message = await this._service.delete(id);
      return res.status(200).json(message);
    } catch (error) {
      next(error)
    }
  };

  public showOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      const user = await this._service.showOne(id);

      return res.status(200).json(user);
    } catch (error) {
      next(error)
    }
  };

};
