import { Router } from 'express'

import { auth } from '../../middleware/auth'
import { followingController } from './following.controller'


const router = Router()

router.post('/',auth("USER","ADMIN"),followingController.createFollowing)


export const followingRouter = router
