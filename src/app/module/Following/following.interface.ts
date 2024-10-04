import { Types } from "mongoose";

export interface IFollowing{
    userId:Types.ObjectId;
    following:string[];
    // followers?:string[];
}

