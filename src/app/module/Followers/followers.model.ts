import { model, Schema } from "mongoose";
import { IFollowers } from "./followers.interface";

const followersSchema = new Schema<IFollowers>({
  userId: {type:Schema.Types.ObjectId,ref:'User'},
  followers:{type:[Schema.Types.ObjectId],ref:"User"},
//   followin: { type: [String] },
});

export const Follower = model<IFollowers>("follower", followersSchema);
