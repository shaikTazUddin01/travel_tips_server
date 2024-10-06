import { Schema, model, Types } from "mongoose";
import { IPost } from "./post.interface";

const postSchema = new Schema<IPost>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User', 
    required: [true, 'User is required.'],
  },
  image: {
    type: String,
    // required: [true, 'Image is required.'],
  },
  category: {
    type: String,
    required: [true, 'Category is required.'],
  },
  postContent: {
    type: String,
    required: [true, 'Post content is required.'],
  },
  type: {
    type: String,
    enum: ["Premium", "Non-Premium"],
    required: [true, 'Tags are required.'],
  },
  like: {
    type: [Schema.Types.ObjectId],
    default:[],
    ref:'User'
  },
  comment: {
    type: Number,
    default: 0,
  },
  share: {
    type: Number,
    default: 0,
  },
isVerify: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true });

export const Post = model<IPost>("Post", postSchema);


