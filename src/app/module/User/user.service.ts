import httpStatus from "http-status";
import { AppError } from "../../error/AppErrors";
import { IUSER } from "./user.interface";
import { User } from "./user.model";

// create new user
const createUserInFoDB = async (data: IUSER) => {
  //check user exists or not
  const isUserExists = await User.findOne({ email: data?.email });
  if (isUserExists) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "This user already exists.try with another E-mail"
    );
  }
  // create user
  data.role = "USER";
  const res = await User.create(data);
  return res;
};

export const userService = {
  createUserInFoDB,
};
