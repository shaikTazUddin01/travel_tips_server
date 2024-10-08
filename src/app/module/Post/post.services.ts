import { JwtPayload } from "jsonwebtoken";
import { decodedToken } from "../../utils/decodedToken";
import { IUSER } from "../User/user.interface";
import { IPost } from "./post.interface";
import { Post } from "./post.model";
import { User } from "../User/user.model";
import { AppError } from "../../error/AppErrors";
import httpStatus from "http-status";

// create post
const createPost = async (payload: IPost, file: string, user: string) => {
  const { userId } = decodedToken(user) as JwtPayload;
  const isUserExists = await User.findById(userId);
  if (!isUserExists) {
    throw new AppError(httpStatus.UNAUTHORIZED, "user not found");
  }
  payload.user = isUserExists?._id;
  payload.image = file;

  const res = await Post.create(payload);
  return res;
};

// get all post
const getAllPost = async (queryData: Record<string, string> | null) => {
  // console.log(queryData);
  let query: { type?: string;category?:string;name?:any} = {};
  if (queryData?.type !="null") {
    query.type = queryData?.type;
  }
  if (queryData?.category !="null") {
    query.category = queryData?.category;
  }
  if (queryData?.search !="null") {
    query.name = {$regex:queryData?.search,$options:"i"};
  }
  console.log("query-->",query);
  const res = await Post.find(query).populate("user").populate({
    path: "comment.userId",
  });
  // console.log(res);
  return res;
};
// get my post
const getMyPost = async (userId: string) => {
  // console.log(userId);
  const res = await Post.find({ user: userId }).populate("user");
  return res;
};
// get specific post
const getSpecificUserPost = async (userId: string) => {
  // console.log(userId);
  const res = await Post.find({ user: userId }).populate("user");
  return res;
};
// delete post
const deletePost = async (id: string) => {
  const res = await Post.findByIdAndDelete(id);
  return res;
};

// upvote and down vote ststem
const upvoteToPost = async (
  userId: string,
  payload: Record<string, string>
) => {
  const { postId } = payload;

  //   check post exists or not
  const isPostExists = await Post.findById(postId);
  if (isPostExists) {
    // check is already upvoted or not
    const isAlreadyUpvoted = await Post.findOne({ _id: postId, like: userId });
    if (isAlreadyUpvoted) {
      const res = await Post.updateOne(
        { _id: postId },
        {
          $pull: { like: userId },
        },
        { new: true }
      );
      return { res, message: "downvote" };
    }

    const res = await Post.updateOne(
      { _id: postId },
      {
        $addToSet: { like: userId },
      },
      { new: true }
    );

    return { res, message: "upvote" };
  }
  return null;
};

//update post
const updatepost = async (payload: any) => {
  console.log(payload.updateInFo);
  const res = await Post.updateOne({ _id: payload?.id }, payload.updateInFo, {
    new: true,
  });
  return res;
};

// comment to post
const commentToPost = async (userId: string, payload: any) => {
  const postId = payload?.postId;
  const newComment = {
    userId: userId,
    comment: payload.comment,
  };

  const res = await Post.updateOne(
    { _id: postId },
    {
      $addToSet: { comment: newComment },
    },
    { new: true }
  );

  // console.log(res);

  return res;
};
// delete comment
const deleteComment = async (
  payload: Record<string, string>,
  userId: string
) => {
  // console.log(payload);
  // console.log(userId);
  const { postId, commentId } = payload;
  // console.log(postId, commentId, userId);
  const isPostExists = await Post.findOne({ _id: postId });

  if (!isPostExists) {
    throw new AppError(httpStatus.NOT_FOUND, "the post is not exists");
  }
  const res = await Post.updateOne(
    { _id: postId },
    { $pull: { comment: { _id: commentId, userId: userId } } },
    { new: true }
  );
  return res;
};
// update comment
const UpdateComment = async (
  payload: Record<string, string>,
  userId: string
) => {
  // console.log(payload);
  const { postId, commentId, comment } = payload;

  const isPostExists = await Post.findOne({ _id: postId });
  // console.log(isPostExists);
  if (!isPostExists) {
    throw new AppError(httpStatus.NOT_FOUND, "the post is not exists");
  }
  const res = await Post.updateOne(
    { _id: postId, "comment._id": commentId, "comment.userId": userId },
    { $set: { "comment.$.comment": comment } }
  );
  return res;
};

export const postServices = {
  createPost,
  getAllPost,
  getMyPost,
  deletePost,
  getSpecificUserPost,
  upvoteToPost,
  updatepost,
  commentToPost,
  deleteComment,
  UpdateComment,
};
