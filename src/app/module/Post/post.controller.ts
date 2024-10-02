import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { postServices } from "./post.services";

const createPost = catchAsync(async (req, res) => {
  const user = req.headers.authorization;
  const result = await postServices.createPost(req.body, user as string);

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
  deletePost
};
