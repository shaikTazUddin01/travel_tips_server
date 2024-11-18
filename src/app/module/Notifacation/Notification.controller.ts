import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { notificationService } from "./Notification.service";

const getMyNotification = catchAsync(async (req, res) => {
    // check user exist or not
  
    const { userId } = req.user;
    const result = await notificationService.getMyNotification(userId);
  
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "retrieve notificaton",
      data: result,
    });
  });
  

  export const notificationController={
    getMyNotification
  }