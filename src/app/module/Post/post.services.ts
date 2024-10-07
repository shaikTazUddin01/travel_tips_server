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
  let query: { type?: string } = {};
  if (queryData?.type) {
    query.type = queryData.type;
  }
  // console.log(query);
  const res = await Post.find(query).populate("user").populate({
    path:'comment.userId'
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
      return {res,message:"downvote"};
    }

    const res = await Post.updateOne(
      { _id: postId },
      {
        $addToSet: { like: userId },
      },
      { new: true }
    );

    return {res,message:"upvote"};
  }
  return null;
};

//update post
const updatepost= async  (payload:any) => {
 console.log(payload.updateInFo);
  const res = await Post.updateOne({_id:payload?.id}, payload.updateInFo, {
    new: true,
  });
  return res;
};

// comment to post 
const commentToPost =async(userId:string,payload:any)=>{
  const postId=payload?.postId;
  const newComment={
    userId:userId,
    comment:payload.comment
  }
  
  const res = await Post.updateOne({_id:postId},{
    $addToSet:{comment:newComment}
  },{new:true})

  console.log(res);

  return res
}

export const postServices = {
  createPost,
  getAllPost,
  getMyPost,
  deletePost,
  getSpecificUserPost,
  upvoteToPost,
  updatepost,
  commentToPost
};
