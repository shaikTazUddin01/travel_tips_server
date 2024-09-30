import { Router } from 'express'
import { userController } from './user.controller'
import { auth } from '../../middleware/auth'
import { User_Role } from '../../constant/userRole'


const router = Router()

router.post('/',userController.createUser)
router.post('/updateProfile',userController.updateUser)

export const userRouter = router
