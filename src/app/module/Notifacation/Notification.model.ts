import { model, Schema } from "mongoose";
import { INotification } from "./notification.interface";


const notificationSchema =new Schema<INotification>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, 
  senderId: { type:Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, enum: ['like', 'comment', 'follow', 'message'], required: true },
  isRead: { type: Boolean, default: false },
  
},{timestamps:true});

export const Notification = model('Notification', notificationSchema);