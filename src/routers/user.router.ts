import { Router } from 'express'
import UserController from '../controllers/user.controller'
import UserService from '../services/user.service'
import updateUserMiddleware from '../middlewares/update.user.middleware'
import loginMiddleware from '../middlewares/login.middleware'
import authMiddleware from '../middlewares/auth.middleware'
import registerMiddleware from '../middlewares/register.middleware'

const userRouter = Router()
const userService = new UserService()
const userController = new UserController(userService)

userRouter.post('/login', loginMiddleware, userController.login)
userRouter.post('/register', registerMiddleware, userController.create)
userRouter.get('/', authMiddleware, userController.show)
userRouter.get('/:id', authMiddleware, userController.showOne)
userRouter.put('/:id', authMiddleware, updateUserMiddleware, userController.update)
userRouter.delete('/:id', authMiddleware, userController.delete)

export default userRouter
