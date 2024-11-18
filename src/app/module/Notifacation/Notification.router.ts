import { Router } from "express";
import { notificationController } from "./Notification.controller";
import { auth } from "../../middleware/auth";
// import { User_Role } from "../../constant/userRole";

const router=Router()

router.get('/',auth("USER","ADMIN"),notificationController.getMyNotification)


export const notificationRouter=router