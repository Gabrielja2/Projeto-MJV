import { Router } from 'express'
import JuiceController from '../controllers/juice.controller'
import JuiceService from '../services/juice.service'
import juiceMiddleware, { juiceUpdateMiddleware } from '../middlewares/juice.middleware'
import JuiceODM from '../models/juiceODM'

const juiceRouter = Router()
const juiceODM = new JuiceODM()
const juiceService = new JuiceService(juiceODM)
const juiceController = new JuiceController(juiceService)

juiceRouter.get('/', juiceController.getAll)
juiceRouter.get('/:id', juiceController.getById)
juiceRouter.delete('/:id', juiceController.delete)
juiceRouter.post('/', juiceMiddleware, juiceController.create)
juiceRouter.put('/:id', juiceUpdateMiddleware, juiceController.update)

export default juiceRouter
