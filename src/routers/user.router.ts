import { Router } from 'express'
import UserController from '../controllers/user.controller'
import UserService from '../services/user.service'
import updateUserMiddleware from '../middlewares/update.user.middleware'

const userRouter = Router()
const userService = new UserService()
const userController = new UserController(userService)

userRouter.get('/', userController.show)
userRouter.get('/:id', userController.showOne)
userRouter.put('/:id', updateUserMiddleware, userController.update)
userRouter.delete('/:id', userController.delete)

export default userRouter
