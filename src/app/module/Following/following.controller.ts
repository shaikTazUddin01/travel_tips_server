import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { followingServer } from "./follow.service";


const createFollowing = catchAsync(async (req, res) => {
  // check user exist or not

  const { userId } = req.user;
  const result = await followingServer.createFollowing(req.body, userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "new following added",
    data: result,
  });
});

const getMyFollowing = catchAsync(async (req, res) => {
  // check user exist or not

  const { userId } = req.user;
  const result = await followingServer.getMyFollowing(userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "retrieve following",
    data: result,
  });
});

export const followingController = {
  createFollowing,
  getMyFollowing
};
