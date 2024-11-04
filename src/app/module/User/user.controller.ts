import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { userService } from "./user.service";
import { AppError } from "../../error/AppErrors";
// import cookieParser from "cookie-parser";

const createUser = catchAsync(async (req, res) => {
  // check user exist or not

  
  const {data}=req.body;
  const file=req?.file?.path
  // console.log(JSON.parse(data));
  const result = await userService.createUserInFoDB(JSON.parse(data),file as string);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "created success",
    data: result,
  });
});
// update user profile
const updateUser = catchAsync(async (req, res) => {
 const userId=req.params.id
  const result = await userService.updateProfile(userId,req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "uddate success",
    data: result,
  });
});
// get all user profile
const getAllUser = catchAsync(async (req, res) => {
  const query=req.query
    const result = await userService.getAlluser(query);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "retrieve success",
    data: result,
  });
});
// get single user
const getSingleUser = catchAsync(async (req, res) => {
  const userId=req?.params?.id
  const result = await userService.getSingleUser(userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "retrieve user success",
    data: result,
  });
});
// delete user
const deleteUser = catchAsync(async (req, res) => {
  const userId=req?.params?.id
  const result = await userService.deleteUser(userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "user delete success",
    data: result,
  });
});


// update profile image
const updateProfileImage = catchAsync(async (req, res) => {
 
  const file=req?.file?.path
  const {userId}=req?.user
  console.log(userId);
  console.log(file);
  
  // console.log(JSON.parse(data));
  const result = await userService.updateProfileImage(userId,file as string);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "image update success",
    data: result,
  });
});


// get my data
const getMyInFo = catchAsync(async (req, res) => {
  const {userId}=req.user
  // console.log(userId);
  const result = await userService.getMyInFo(userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "retrieve user success",
    data: result,
  });
});

// send Friend request
const sendFriendRequest = catchAsync(async (req, res) => {
  const {userId}=req.user
  const result = await userService.sendFriendRequest(userId,req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "request send success",
    data: result,
  });
});
// handle confirm request
const confirmRequest = catchAsync(async (req, res) => {
  const {userId}=req.user
  const result = await userService.handleConfirmRequest(userId,req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "accept request",
    data: result,
  });
});
// handle delete request
const deleteRequest = catchAsync(async (req, res) => {
  const {userId}=req.user
  const result = await userService.handleDeleteRequest(userId,req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "delete request",
    data: result,
  });
});
// handle delete request
const unfriend = catchAsync(async (req, res) => {
  const {userId}=req.user
  const result = await userService.handleUnfriend(userId,req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "unfriend",
    data: result,
  });
});

export const userController = {
  createUser,
  updateUser,
  getAllUser,
  getSingleUser,
  deleteUser,
  updateProfileImage,
  getMyInFo,
  sendFriendRequest,
  confirmRequest,
  deleteRequest,
  unfriend
};
