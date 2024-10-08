import { Router } from 'express'
import { userController } from './user.controller'
import { auth } from '../../middleware/auth'
import { User_Role } from '../../constant/userRole'
import { multerUpload } from '../../config/multer.config'


const router = Router()

router.post('/',multerUpload.single('image'),userController.createUser)
router.patch('/updateUserProfile/:id',userController.updateUser)
router.get('/getUsers',auth("USER","ADMIN"),userController.getAllUser)
router.get('/getSingleUser/:id',auth("USER","ADMIN"),userController.getSingleUser)
router.delete('/deleteUser/:id',auth("ADMIN"),userController.deleteUser)
router.patch('/updateProfileImage',auth("ADMIN","USER"),multerUpload.single('image'),userController.updateProfileImage)

export const userRouter = router
