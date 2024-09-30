import config from "../config";

import jwt, { JwtPayload } from "jsonwebtoken";
import catchAsync from "../utils/catchAsync";
import { User } from "../module/User/user.model";
import { AppError } from "../error/AppErrors";
import httpStatus from "http-status";
import { TUser_Role } from "../type";

export const auth = (...requiredRole: TUser_Role[]) => {
  return catchAsync(async (req, res, next) => {
    const decoded = jwt.verify(
      req?.headers?.authorization as string,
      config.accessToken_Secret as string
    );

    const { userId, email, role } = decoded as JwtPayload;

    const isUserExists = await User.findById(userId);

    if (!isUserExists) {
      throw new AppError(httpStatus.UNAUTHORIZED, "you are not authorized");
    }

    if (requiredRole && !requiredRole.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, "you are not authorized");
    }

    req.user = decoded as JwtPayload;
    next()
  });
};
