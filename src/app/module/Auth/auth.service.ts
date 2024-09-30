import httpStatus from "http-status";
import { AppError } from "../../error/AppErrors";
import { User } from "../User/user.model";
import { IAuth } from "./auth.interface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config";

// create new user
const authLogin = async (data: IAuth) => {
  // check user exists or not
  const isUserExists = await User.findOne({ email: data?.email });
  if (!isUserExists) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "You have no accout , Please sign up.."
    );
  }
  console.log(isUserExists);
  // match password
  const ispasswordMatch = await bcrypt.compare(
    data?.password,
    isUserExists?.password
  );

  if (!ispasswordMatch) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "Something is wrong please try again"
    );
  }
  const userInfo = {
    userId: isUserExists?._id,
    email: isUserExists?.email,
    name: isUserExists?.name,
    role:isUserExists?.role,
    phoneNumber: isUserExists?.phoneNumber,
    image: isUserExists?.image,
  };
  // create token
  const accessToken = jwt.sign(
    userInfo,
    config.accessToken_Secret as string,
    {expiresIn:config.accessToken_ExpiresIn}
  );
  const refreshToken = jwt.sign(
    userInfo,
    config.refreshToken_Secret as string,
    {expiresIn:config.refreshToken_ExpiresIn}
  );

  return {
    accessToken,
    refreshToken
  };
};

export const authService = {
  authLogin,
};
