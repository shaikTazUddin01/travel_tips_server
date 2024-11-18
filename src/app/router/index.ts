import { Router } from 'express'
import { authRouter } from '../module/Auth/auth.router'
import { userRouter } from '../module/User/user.router'
import { postRouter } from '../module/Post/post.router'
import { followingRouter } from '../module/Following/following.router'
import { followersRouter } from '../module/Followers/followers.router'
import { verifyUserRoutes } from '../module/Verify/verify.router'
import { paymentRouter } from '../utils/payment/paymant.router'
import { notificationRouter } from '../module/Notifacation/Notification.router'

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
  {
    path: '/following',
    pathRoute: followingRouter,
  },
  {
    path: '/followers',
    pathRoute: followersRouter,
  },
  {
    path: '/verifyAccount',
    pathRoute: verifyUserRoutes,
  },
  {
    path: '/payment',
    pathRoute: paymentRouter,
  },
  {
    path: '/notification',
    pathRoute: notificationRouter,
  },

]

modulesRoutes.forEach(route => router.use(route?.path, route?.pathRoute))

export default router
