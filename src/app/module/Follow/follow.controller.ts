import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userService } from "../User/user.service";
import { followServer } from "./follow.service";

const createFollow = catchAsync(async (req, res) => {
  // check user exist or not

  const { userId } = req.user;
//   console.log(userId);
//   console.log(req.body);
  const result = await followServer.createFollow(req.body, userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "new following added",
    data: result,
  });
});

export const followController = {
  createFollow,
};
