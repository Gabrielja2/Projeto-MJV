import { Router } from 'express'
import healthRouter from './health.router'
import juiceRouter from './juice.router'
import userRouter from './user.router'
import orderRouter from './order.router'
import adminRouter from './admin.router'
import authMiddleware from '../middlewares/auth.middleware'

const router = Router()
router.use('/health', healthRouter)
router.use('/user', userRouter)
router.use('/admin', authMiddleware, adminRouter)
router.use('/juice', authMiddleware, juiceRouter)
router.use('/order', authMiddleware, orderRouter)

export default router
