import { Types } from "mongoose";

export interface IComment{
   userId:Types.ObjectId,
   comment:string
}


export interface IPost {
  user: Types.ObjectId;
  image?: string;
  category: string;
  postContent: string;
  type: "Premium" | "Non-Premium";
  like: Types.ObjectId[];
  comment: IComment[];
  share: number;
  status: "Active" | "Blocked";
}
