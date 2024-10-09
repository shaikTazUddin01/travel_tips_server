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
  // console.log(isUserExists);
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
    address:isUserExists?.address,
    gender:isUserExists?.gender,
    age:isUserExists?.age,
    image: isUserExists?.image,
    isVerify:isUserExists?.isVerify
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


const changePassword=async(payload:Record<string,any>)=>{
// console.log(payload);
  const isUserExists=await User.findOne({email:payload?.email})

  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND,"please enter with right information")
  }
// console.log("user->",isUserExists);
  const ispasswordMatch = await bcrypt.compare(
    payload?.password,
    isUserExists?.password
  );
  // console.log(ispasswordMatch);
  if (!ispasswordMatch) {
    throw new AppError(httpStatus.NOT_FOUND,"please enter with right information")
  }

  const res= await User.updateOne({email:isUserExists?.email},{password:payload?.newPassword},{new:true})
// console.log(res);
  return res
}

const formatePassword=async(payload:Record<string,any>)=>{
// console.log(payload);
  const isUserExists=await User.findOne({email:payload?.email})

  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND,"the user is not exists plese sign up ")
  }


  const res= await User.updateOne({email:isUserExists?.email},{password:payload?.newPassword},{new:true})
console.log(res);
  return res
}


export const authService = {
  authLogin,
  changePassword,
  formatePassword
};
