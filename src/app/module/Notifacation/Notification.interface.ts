import { Types } from "mongoose";

export interface INotification{
    userId:Types.ObjectId;
    senderId:Types.ObjectId;
    type:"like"|"comment"|"follow"|"message";
    isRead:boolean;
}