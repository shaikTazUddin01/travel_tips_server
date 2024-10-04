import { model, Schema } from "mongoose";
import { IFollowing } from "./following.interface";

const followingSchema = new Schema<IFollowing>({
  userId: {type:Schema.Types.ObjectId,ref:'user'},
  // followers:{type:[String]},
  following: { type: [String] },
});

export const Following = model<IFollowing>("following", followingSchema);
