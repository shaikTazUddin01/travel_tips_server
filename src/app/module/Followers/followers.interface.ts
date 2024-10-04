import { Types } from "mongoose";

export interface IFollowers{
    userId:Types.ObjectId;
    followers:[Types.ObjectId];
    // followers?:string[];
}

