import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { followersService } from "./Followers.service";


const getMyallFollower = catchAsync(async (req, res) => {
    // check user exist or not
  
    const { userId } = req.user;
    const result = await followersService.getMyAllFollowers(userId);
  
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "retrieve my followers",
      data: result,
    });
  });
const getSpecificFollower = catchAsync(async (req, res) => {
    // check user exist or not
  
    const { userId } = req.params;
    // console.log(req.params);
    const result = await followersService.getSpecificUserFollowers(userId);
  
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "retrieve followers",
      data: result,
    });
  });

  export const followersController={
    getMyallFollower,
    getSpecificFollower
  }