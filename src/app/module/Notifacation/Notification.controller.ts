import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { notificationService } from "./Notification.service";

const getMyNotification = catchAsync(async (req, res) => {
    // check user exist or not
  
    const { userId } = req.user;
    // console.log(userId);
    const result = await notificationService.getMyNotification(userId);
  
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "retrieve notificaton",
      data: result,
    });
  });
  
const updateReadNotification = catchAsync(async (req, res) => {
    // check user exist or not
  
    const { userId } = req.user;
    // console.log(userId);
    const result = await notificationService.updateReadStatus(userId);
  
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "read notificaton",
      data: result,
    });
  });
  

  export const notificationController={
    getMyNotification,
    updateReadNotification
  }