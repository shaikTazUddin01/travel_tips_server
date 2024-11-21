import { Router } from "express";
import { notificationController } from "./Notification.controller";
import { auth } from "../../middleware/auth";
// import { User_Role } from "../../constant/userRole";

const router=Router()

router.get('/',auth("USER","ADMIN"),notificationController.getMyNotification)
router.patch('/isread',auth("USER","ADMIN"),notificationController.updateReadNotification)


export const notificationRouter=router