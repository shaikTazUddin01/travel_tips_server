import { Router } from 'express'

import { auth } from '../../middleware/auth'
import { followersController } from './followers.controller'



const router = Router()

router.get('/myFollowers',auth("USER","ADMIN"),followersController.getMyallFollower)


export const followersRouter = router
