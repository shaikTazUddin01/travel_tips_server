import { Types } from "mongoose";

export interface IFollow{
    userId:Types.ObjectId;
    following:string[];
    // followers?:string[];
}

