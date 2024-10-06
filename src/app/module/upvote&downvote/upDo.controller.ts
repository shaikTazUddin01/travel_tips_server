import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { upvoteService } from "./upDo.service";


const upvoteToUser = catchAsync(async (req, res) => {
    // check user exist or not
  
    const { userId } = req.user;
    const result = await upvoteService.upvoteToPost()
  
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "you react the post",
      data: result,
    });
  });

  export const upvoteController={
    upvoteToUser
  }