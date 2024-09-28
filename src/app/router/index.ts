import { Router } from 'express'
import { authRouter } from '../module/Auth/auth.router'
import { userRouter } from '../module/User/user.router'

const router = Router()

const modulesRoutes = [
  {
    path: '/auth',
    pathRoute: authRouter,
  },
  {
    path: '/user',
    pathRoute: userRouter,
  },
]

modulesRoutes.forEach(route => router.use(route?.path, route?.pathRoute))

export default router
