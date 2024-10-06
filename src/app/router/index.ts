import { Router } from 'express'
import { authRouter } from '../module/Auth/auth.router'
import { userRouter } from '../module/User/user.router'
import { postRouter } from '../module/Post/post.router'
import { followingRouter } from '../module/Following/following.router'
import { followersRouter } from '../module/Followers/followers.router'
import { upvoteRouter } from '../module/upvote&downvote/upDo.router'

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
    path: '/upvote',
    pathRoute: upvoteRouter,
  },
]

modulesRoutes.forEach(route => router.use(route?.path, route?.pathRoute))

export default router
