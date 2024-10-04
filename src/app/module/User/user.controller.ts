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
  const userToken=req.headers.authorization
  // check user exist or not
  if (!userToken) {
    throw new AppError(httpStatus.UNAUTHORIZED,"you are not authorized")
  }

  const result = await userService.updateProfile(req.body,userToken as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "uddate success",
    data: result,
  });
});
// get all user profile
const getAllUser = catchAsync(async (req, res) => {
 

  const result = await userService.getAlluser();

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

export const userController = {
  createUser,
  updateUser,
  getAllUser,
  getSingleUser
};
