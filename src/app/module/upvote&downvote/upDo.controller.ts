import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { upvoteService } from "./upDo.service";

const upvoteToUser = catchAsync(async (req, res) => {
  // check user exist or not

  const { userId } = req.user;
//   const postId = req.body;
  const result = await upvoteService.upvoteToPost( userId, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: result?.message,
    data: result?.res,
  });
});

export const upvoteController = {
  upvoteToUser,
};
