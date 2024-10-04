import { Router } from 'express'

import { auth } from '../../middleware/auth'
import { followController } from './follow.controller'
// import { User_Role } from '../../constant/userRole'
// import { multerUpload } from '../../config/multer.config'


const router = Router()

router.post('/',auth("USER","ADMIN"),followController.createFollow)


export const followRouter = router
