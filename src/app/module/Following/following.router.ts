import { Router } from 'express'

import { auth } from '../../middleware/auth'
import { followingController } from './following.controller'


const router = Router()

router.post('/',auth("USER","ADMIN"),followingController.createFollowing)
router.get('/myFollowing',auth("USER","ADMIN"),followingController.getMyFollowing)


export const followingRouter = router
