import { model, Schema } from "mongoose";
import { IFollow } from "./follow.interface";


const followSchema=new Schema<IFollow>({
    userId:Schema.Types.ObjectId,
    // followers:{type:[String]},
    following:{type:[String]}
    
})

export const Follow=model<IFollow>("follow",followSchema)