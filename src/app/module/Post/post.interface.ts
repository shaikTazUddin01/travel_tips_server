import { Types } from "mongoose";

export interface IPost {
    user: Types.ObjectId;
    image: string;
    category:string;
    postContent: string;
    tags:"Premium"|"Non-Premium";
    like:number;
    comment:number;
    share:number;
    isVerify:boolean
  }
 
  