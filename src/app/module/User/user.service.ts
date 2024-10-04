import httpStatus from "http-status";
import { AppError } from "../../error/AppErrors";
import { IDecodedUser, IUSER } from "./user.interface";
import { User } from "./user.model";
import config from "../../config";
import { decodedToken } from "../../utils/decodedToken";
import jwt, { JwtPayload } from "jsonwebtoken";

// create new user
const createUserInFoDB = async (data: IUSER, profileImage: string) => {
  //check user exists or not
  // console.log(data);
  data.image = profileImage;
  const isUserExists = await User.findOne({ email: data?.email });
  if (isUserExists) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "This user already exists.try with another E-mail"
    );
  }
  // // create user
  data.role = "USER";
  // console.log(data);
  const res = await User.create(data);
  return res;
  // return res
};

//update profile
const updateProfile = async (payload: Partial<IUSER>, userToken: string) => {
  const decoded = decodedToken(userToken) as JwtPayload;

  // console.log(decoded);

  if (!decoded) {
    throw new AppError(httpStatus.UNAUTHORIZED, "you are not authorized");
  }

  const res = await User.findByIdAndUpdate(decoded?.userId, payload, {
    new: true,
  });
  return res;
};

const getAlluser=async()=>{
  const res=await User.find()
  return res
}

const getSingleUser=async(userId:string)=>{
  const res=await User.findById(userId)
  return res
}

export const userService = {
  createUserInFoDB,
  updateProfile,
  getAlluser,
  getSingleUser
};
