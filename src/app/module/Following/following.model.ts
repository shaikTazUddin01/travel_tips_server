import { model, Schema } from "mongoose";
import { IFollowing } from "./following.interface";

const followingSchema = new Schema<IFollowing>({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  // followers:{type:[String]},
  following: { type: [Schema.Types.ObjectId],ref:'User' },
});

export const Following = model<IFollowing>("following", followingSchema);
