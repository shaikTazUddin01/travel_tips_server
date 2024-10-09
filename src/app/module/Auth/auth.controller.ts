import { Request, Response } from "express";
import { authService } from "./auth.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const login = catchAsync(async (req, res) => {
  const result = await authService.authLogin(req.body);

  res.cookie("refreshToken", result?.refreshToken);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "login success",
    data: result,
  });
});

const changePassword = catchAsync(async (req, res) => {
  const result = await authService.changePassword(req.body);

  

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "password change success",
    data: result,
  });
});
const forgotPassword = catchAsync(async (req, res) => {
  const result = await authService.forgotPassword(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "password formate success",
    data: result,
  });
});

export const authController = {
  login,
  changePassword,
  forgotPassword
};
