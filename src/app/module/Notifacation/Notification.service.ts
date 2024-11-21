import { Notification } from "./notification.model";


const getMyNotification=async(userId:string)=>{
const res =await Notification.find({userId:userId}).populate("senderId");
// console.log(res);
return res
}


const updateReadStatus=async(userId:string)=>{
    const res=await Notification.updateMany({userId:userId},{isRead:true})
    // console.log(res);
    return res
}

export const notificationService={
    getMyNotification,
    updateReadStatus
}