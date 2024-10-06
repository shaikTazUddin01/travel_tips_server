import { Router } from 'express'

import { auth } from '../../middleware/auth'
import { upvoteController } from './upDo.controller'


const router = Router()

router.post('/',auth("USER","ADMIN"),upvoteController.upvoteToUser)
// router.get('/specificPostUpvote',auth("USER","ADMIN"),)


export const upvoteRouter = router
