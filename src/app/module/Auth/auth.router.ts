import { Router } from 'express'
import { authController } from './auth.controller'
import { auth } from '../../middleware/auth'

const router = Router()

router.post('/login',authController.login)
router.post('/changePassword',auth("ADMIN","USER"),authController.changePassword)
router.post('/forgotPassword',authController.forgotPassword)

export const authRouter = router
