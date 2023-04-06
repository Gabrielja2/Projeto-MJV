import { Router } from 'express'
import OrderController from '../controllers/order.controller'
import OrderService from '../services/order.service'
import OrderODM from '../models/orderODM'
import JuiceODM from '../models/juiceODM'
import orderMiddleware from '../middlewares/order.middleware'

const orderRouter = Router()
const orderODM = new OrderODM()
const juiceODM = new JuiceODM()
const orderService = new OrderService(orderODM, juiceODM)
const orderController = new OrderController(orderService)

orderRouter.post('/', orderMiddleware, orderController.create)
orderRouter.get('/', orderController.getAll)

export default orderRouter
