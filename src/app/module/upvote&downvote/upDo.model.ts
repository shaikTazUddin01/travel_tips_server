import { model, Schema } from "mongoose";
import { IUpvote } from "./upDo.interface";

const upvoteSchema = new Schema<IUpvote>({
  postId: { type: Schema.Types.ObjectId, ref: "Post" },
  upvotedUserId: { type: [Schema.Types.ObjectId],ref:'User' },
});

export const Upvote = model<IUpvote>("upvote", upvoteSchema);
