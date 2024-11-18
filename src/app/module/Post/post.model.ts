import { Schema, model, Types } from "mongoose";
import { IPost } from "./post.interface";

const commentSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "UserId is required."],
  },
  comment: {
    type: String,
    required: [true, "Comment is required."],
    default:[]
  },
});




const postSchema = new Schema<IPost>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required."],
    },
    image: {
      type: String,
      // required: [true, 'Image is required.'],
    },
    category: {
      type: String,
      // required: [true, "Category is required."],
    },
    postContent: {
      type: String,
      // required: [true, "Post content is required."],
    },
    shareDetails: {
      type: String ,
      
    },
    type: {
      type: String,
      enum: ["Premium", "Non-Premium"],
      // required: [true, "Tags are required."],
    },
    like: {
      type: [Schema.Types.ObjectId],
      default: [],
      ref: "User",
    },
    comment: {
      type: [commentSchema],
      default: [],
    },
    share: {
      type:  [Schema.Types.ObjectId],
      ref:"User",
      default: [],
    },
    status: {
      type: String,
      enum: ["Active", "Blocked"],
      default: "Active",
    },
    authId: {
      type:  Schema.Types.ObjectId,
      ref:"User"
     
    },
    postId: {
      type:  Schema.Types.ObjectId,
      ref:"Post",
     
    },
    isThisPostShare: {
      type:  Boolean,
      // ref:"Post",
     
    },
  },
  { timestamps: true }
);




export const Post = model<IPost>("Post", postSchema);
