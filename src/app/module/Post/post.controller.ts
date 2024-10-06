import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { postServices } from "./post.services";

const createPost = catchAsync(async (req, res) => {
  const user = req.headers.authorization;
  const data =req?.body?.data
  const file =req.file?.path
  // console.log(data,file);
  const result = await postServices.createPost(JSON.parse(data),file as string, user as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "post created success",
    data: result,
  });
});
const getAllPost = catchAsync(async (req, res) => {
  const result = await postServices.getAllPost(req.query as Record<string,string>);

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
  const userId=req.params.id
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
  
const id=req.params.id
  const result = await postServices.deletePost(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "post deleted success",
    data: result,
  });
});

export const postcontroller = {
  createPost,
  getAllPost,
  getMyAllPost,
  deletePost,
  getSpecificUserPost 
};
