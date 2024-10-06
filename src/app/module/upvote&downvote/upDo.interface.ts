import { Types } from "mongoose";

export interface IUpvote{
    postId:Types.ObjectId;
    upvotedUserId:Types.ObjectId[];
}

