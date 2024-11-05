import { Router } from 'express'

import { auth } from '../../middleware/auth'
import { followersController } from './followers.controller'



const router = Router()

router.get('/myFollowers',auth("USER","ADMIN"),followersController.getMyallFollower)

router.get('/specificFollowers/:userId',auth("USER","ADMIN"),followersController.getSpecificFollower)


export const followersRouter = router
