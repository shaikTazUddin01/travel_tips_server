import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { postServices } from "./post.services";

const createPost = catchAsync(async (req, res) => {
  const user = req.headers.authorization;
  const data = req?.body?.data;
  const file = req.file?.path;
  console.log(data, file);
  const result = await postServices.createPost(
    JSON.parse(data),
    file as string,
    user as string
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "post created success",
    data: result,
  });
});
const getAllPost = catchAsync(async (req, res) => {
  const result = await postServices.getAllPost(
    req.query as Record<string, string>
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "post retrieve success",
    data: result,
  });
});
const getMyAllPost = catchAsync(async (req, res) => {
  const { userId } = req.user;
  //   console.log(userId);
  const result = await postServices.getMyPost(userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "post retrieve success",
    data: result,
  });
});
// GET SEecific user post
const getSpecificUserPost = catchAsync(async (req, res) => {
  const userId = req.params.id;
  //   console.log(userId);
  const result = await postServices.getSpecificUserPost(userId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "post retrieve success",
    data: result,
  });
});
const deletePost = catchAsync(async (req, res) => {
  const id = req.params.id;
  const{userId}=req.user

  const result = await postServices.deletePost(userId,id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "post deleted success",
    data: result,
  });
});

// upvote and downvote system
const upvoteToUser = catchAsync(async (req, res) => {
  // check user exist or not

  const { userId } = req.user;
  //   const postId = req.body;
  const result = await postServices.upvoteToPost(userId, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: result?.message,
    data: result?.res,
  });
});

// update post
const updatePost = catchAsync(async (req, res) => {
  // console.log(req.body);
  const {userId}=req.user
  const postId=req.params.id
 
  const result = await postServices.updatepost(req.body,userId,postId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "post update success",
    data: null,
  });
});
// post a  comment
const commentToPost = catchAsync(async (req, res) => {
  const {userId}=req.user
  // console.log(req.body);
  const result = await postServices.commentToPost(userId,req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "comment posting",
    data: result,
  });
});
// delete comment
const deleteComment = catchAsync(async (req, res) => {
  const {userId}=req.user
  const result = await postServices.deleteComment(req.body,userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "comment deleting",
    data: result,
  });
});
// update comment
const updateComment = catchAsync(async (req, res) => {
  const {userId}=req.user
  const result = await postServices.UpdateComment(req.body,userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "comment updating",
    data: result,
  });
});
// get single post
const getSinglePost = catchAsync(async (req, res) => {
  const {id}=req.params
  const result = await postServices.getSinglePost(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "post retrieve success",
    data: result,
  });
});

export const postcontroller = {
  createPost,
  getAllPost,
  getMyAllPost,
  deletePost,
  getSpecificUserPost,
  upvoteToUser,
  updatePost,
  commentToPost,
  deleteComment,
  updateComment,
  getSinglePost
};
