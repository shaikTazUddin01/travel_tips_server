import { Notification } from "./notification.model"

const getMyNotification=async(userId:string)=>{
const res =await Notification.find({userId:userId}).populate("senderId");

return res
}


export const notificationService={
    getMyNotification
}