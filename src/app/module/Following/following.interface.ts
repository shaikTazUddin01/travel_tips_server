import { Types } from "mongoose";

export interface IFollowing{
    userId:Types.ObjectId;
    following:Types.ObjectId[];
    // followers?:string[];
}

