import { JwtPayload } from "jsonwebtoken";
import { decodedToken } from "../../utils/decodedToken";
import { IUSER } from "../User/user.interface";
import { IPost } from "./post.interface";
import { Post } from "./post.model";
import { User } from "../User/user.model";
import { AppError } from "../../error/AppErrors";
import httpStatus from "http-status";

// create post
const createPost = async (payload: IPost, user: string) => {
  const { userId } = decodedToken(user) as JwtPayload;

  const isUserExists = await User.findById(userId);
  if (!isUserExists) {
    throw new AppError(httpStatus.UNAUTHORIZED, "user not found");
  }
  payload.user = isUserExists?._id;

  const res = await Post.create(payload);
  return res;
};


// get all post
const getAllPost = async (queryData:Record<string,string>|null) => {
console.log(queryData);
let query:{tags?:string}={}
if (queryData?.tags) {
  query.tags=queryData.tags
}
console.log(query);
  const res = await Post.find(query).populate("user");
  console.log(res);
  return res;
};
// get my post
const getMyPost = async (userId: string) => {
  console.log(userId);
  const res = await Post.find({ user: userId }).populate("user");
  
  return res;
};
// delete post
const deletePost = async (id: string) => {
 
  const res = await Post.findByIdAndDelete(id);
  
  return res;
};

export const postServices = {
  createPost,
  getAllPost,
  getMyPost,
  deletePost
};