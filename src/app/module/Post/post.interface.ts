import { Types } from "mongoose";

export interface IPost {
  user: Types.ObjectId;
  image?: string;
  category: string;
  postContent: string;
  type: "Premium" | "Non-Premium";
  like: Types.ObjectId[];
  comment: number;
  share: number;
  status: "Active" | "Blocked";
}
