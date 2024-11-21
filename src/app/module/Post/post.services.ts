import { JwtPayload } from "jsonwebtoken";
import { decodedToken } from "../../utils/decodedToken";
// import { IUSER } from "../User/user.interface";
import { IPost } from "./post.interface";
import { Post } from "./post.model";
import { User } from "../User/user.model";
import { AppError } from "../../error/AppErrors";
import httpStatus from "http-status";
// import mongoose, { Mongoose } from "mongoose";

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

const getAllPost = async (queryData: Record<string, string> | null) => {
  try {
    let query: {
      type?: string;
      category?: string;
      postContent?: any;
      status?: string;
    } = {};

    // console.log(queryData);
    // Handle filter conditions based on queryData
    if (queryData?.type && queryData.type !== "null") {
      query.type = queryData.type;
    }
    if (queryData?.category && queryData.category !== "null") {
      query.category = queryData.category;
    }
    if (
      queryData?.search &&
      queryData.search !== "null" &&
      queryData.search !== null &&
      queryData.search.trim() !== ""
    ) {
      query.postContent = { $regex: queryData.search, $options: "i" };
    }

    query.status = "Active";

    let posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .populate("user")
      .populate({
        path: "comment.userId",
      })
      .populate("share")
      .populate("authId")
      .populate("postId");

    //handle sorting
    if (queryData?.sorting === "dsc") {
      posts = posts.sort((a: any, b: any) => a.like.length - b.like.length);
    } else if (queryData?.sorting === "asc") {
      posts = posts.sort((a: any, b: any) => b.like.length - a.like.length);
    }

    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

// get my post
const getMyPost = async (userId: string) => {
  // console.log(userId);
  const res = await Post.find({ user: userId, status: "Active" })
    .sort({ createdAt: -1 })
    .populate("user")
    .populate("share")
    .populate("authId")
    .populate("postId");
  return res;
};
// get specific post
const getSpecificUserPost = async (userId: string) => {
  // console.log(userId);
  const res = await Post.find({ user: userId, status: "Active" })
    .populate("user")
    .populate("share")
    .populate("authId")
    .populate("postId");
  return res;
};
// delete post
const deletePost = async (userId: string, id: string) => {
  // console.log(userId,id);
  const res = await Post.deleteOne({ _id: id, user: userId });
  // console.log(res);
  return res;
};
// delete post
const deletePostByAdmin = async (id: string) => {
  // console.log(userId,id);
  const res = await Post.deleteOne({ _id: id });
  // console.log(res);
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
const updatepost = async (payload: any, userId: string, postId: string) => {
  // console.log(payload.updateInFo);
  const res = await Post.updateOne({ _id: postId, user: userId }, payload, {
    new: true,
  });
  return res;
};

// comment to post
const commentToPost = async (userId: string, payload: any) => {
  const postId = payload?.postId;
  const newComment = {
    userId:userId,
    comment: payload.comment,
  };

  // console.log(postId);
  console.log(newComment);
  const post = await Post.findById(postId);

  if (!post) {
    throw new AppError(httpStatus.NOT_FOUND, "not found");
  }

  // console.log(post);

//  post.comment?.push(newComment)

// console.log(post.comment);

  const res = await Post.findByIdAndUpdate(
    postId,
    // post,
    { $push: { comment: newComment } },
    { new: true }
  );

  console.log(res);

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
    { $set: { "comment.$.comment": comment } },
    { new: true }
  );
  return res;
};

// single post
const getSinglePost = async (postId: string) => {
  // const status={status:"Active"}

  const res = await Post.findOne({ _id: postId, status: "Active" })
    .populate("user")
    .populate({
      path: "comment.userId",
    })
    .populate("share")
    .populate("authId")
    .populate("postId");
  return res;
};
//
//update by Admin
const updatepostByAdmin = async (payload: any, postId: string) => {
  // console.log(payload.updateInFo);
  const res = await Post.updateOne({ _id: postId }, payload, {
    new: true,
  });
  return res;
};

//get all post by Admin
const getpostByAdmin = async () => {
  // console.log(payload.updateInFo);
  const res = await Post.find()
    .populate("user")
    .populate("share")
    .populate("authId")
    .populate("postId");
  return res;
};

//share post
const sharePost = async (payload: Record<string, string>) => {
  // console.log(payload);
  const res = await Post.updateOne(
    { _id: payload?.postId },
    { $addToSet: { share: payload?.user } }
  );

  // console.log(res);

  if (res) {
    const data = {
      user: payload?.user,
      authId: payload?.authId,
      shareDetails: payload?.shareDetails,
      postId: payload?.postId,
      isThisPostShare: true,
    };

    const result = await Post.create(data);
    // console.log(result);
    return result;
  }

  // return res
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
  getSinglePost,
  updatepostByAdmin,
  getpostByAdmin,
  deletePostByAdmin,
  sharePost,
};
