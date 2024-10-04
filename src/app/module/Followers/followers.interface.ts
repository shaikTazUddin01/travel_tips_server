import { Types } from "mongoose";

export interface IFollowers{
    userId:Types.ObjectId;
    followers:string[];
    // followers?:string[];
}

