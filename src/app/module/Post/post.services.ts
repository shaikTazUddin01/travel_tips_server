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
  console.log(res);
  return res;
};

// get all post
const getAllPost = async () => {
  const res = await Post.find().populate('user');
  // console.log(res);
  return res;
};

export const postServices = {
  createPost,
  getAllPost
};
