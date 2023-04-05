import { Router } from 'express'
import JuiceController from '../controllers/juice.controller'
import JuiceService from '../services/juice.service'
import juiceMiddleware, { juiceUpdateMiddleware } from '../middlewares/juice.middleware'

const juiceRouter = Router()
const juiceService = new JuiceService()
const juiceController = new JuiceController(juiceService)

juiceRouter.get('/', juiceController.show)
juiceRouter.get('/:id', juiceController.showOne)
juiceRouter.delete('/:id', juiceController.delete)
juiceRouter.post('/', juiceMiddleware, juiceController.create)
juiceRouter.put('/:id', juiceUpdateMiddleware, juiceController.update)

export default juiceRouter
