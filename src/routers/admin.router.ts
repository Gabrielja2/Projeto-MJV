import { Router } from 'express'
import UserODM from '../models/userODM'
import AdminService from '../services/admin.service'
import AdminController from '../controllers/admin.controller'

const adminRouter = Router()
const userODM = new UserODM()
const adminService = new AdminService(userODM)
const adminController = new AdminController(adminService)

adminRouter.post('/register', adminController.create)

export default adminRouter
