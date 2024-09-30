import { Router } from 'express'
import { authRouter } from '../module/Auth/auth.router'
import { userRouter } from '../module/User/user.router'
import { postRouter } from '../module/Post/post.router'

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
  {
    path: '/post',
    pathRoute: postRouter,
  },
]

modulesRoutes.forEach(route => router.use(route?.path, route?.pathRoute))

export default router
