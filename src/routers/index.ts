import { Router } from 'express'
import healthRouter from './health.router'
import loginRouter from './login.router'
import registerRouter from './register.router'
import juiceRouter from './juice.router'
import userRouter from './user.router'
import authMiddleware from '../middlewares/auth.middleware'

const router = Router()
router.use('/health', healthRouter)
router.use('/login', loginRouter)
router.use('/register', registerRouter)
router.use('/user', authMiddleware, userRouter)
router.use('/juice', authMiddleware, juiceRouter)

export default router
