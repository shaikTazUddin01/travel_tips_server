import httpStatus from "http-status";
import { AppError } from "../../error/AppErrors";
import { IDecodedUser, IUSER } from "./user.interface";
import { User } from "./user.model";
import config from "../../config";
import { decodedToken } from "../../utils/decodedToken";
import jwt, { JwtPayload } from "jsonwebtoken";
import { QueryParams } from "../../type";
import { Notification } from "../Notifacation/notification.model";

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
const updateProfile = async (userId: string, payload: Partial<IUSER>) => {
  const res = await User.updateOne({ _id: userId }, payload, {
    new: true,
  });
  return res;
};

const getAlluser = async (query: QueryParams) => {
  // console.log(query);
  const filter = query.verified ? { isVerify: true } : {};

  if (query.verified) {
    filter.isVerify = true;
  }
  // console.log(filter);

  const res = await User.find(filter);
  return res;
};

const getSingleUser = async (userId: string) => {
  const res = await User.findById(userId);
  return res;
};

const deleteUser = async (userId: string) => {
  const res = await User.deleteOne({ _id: userId });
  return res;
};

// update Profile image
const updateProfileImage = async (userId: string, profileImage: string) => {
  const res = await User.updateOne({ _id: userId }, { image: profileImage });
  return res;
  // return res
};

const getMyInFo = async (userId: string) => {
  const res = await User.findById(userId)
    .populate("receivedFriendRequest")
    .populate("sendFriendRequest")
    .populate("myFriendList");

  return res;
};

// handle friend request
const sendFriendRequest = async (
  userId: string,
  requestedUserId: Record<string, string>
) => {
  const myId = userId;
  const sendRequestId = requestedUserId?.userId;

  //if already send then cancel request
  const isAlreadySend = await User.findOne({
    _id: myId,
    sendFriendRequest: sendRequestId,
  });
  console.log("already", isAlreadySend);
  if (isAlreadySend) {
    const res = await User.updateOne(
      { _id: myId },
      { $pull: { sendFriendRequest: sendRequestId } },
      { new: true }
    );

    if (res?.modifiedCount) {
      await User.updateOne(
        { _id: sendRequestId },
        { $pull: { receivedFriendRequest: myId } },
        { new: true }
      );
    }
    return res;
  }

  //if not exists

  const res = await User.updateOne(
    { _id: myId },
    { $addToSet: { sendFriendRequest: sendRequestId } },
    { new: true }
  );

  if (res?.modifiedCount) {
    await User.updateOne(
      { _id: sendRequestId },
      { $addToSet: { receivedFriendRequest: myId } },
      { new: true }
    );
  }

  return res;
};

// handle confirm request
const handleConfirmRequest = async (
  userId: string,
  requestedUserId: Record<string, string>
) => {
  const myId = userId;
  const RequestedId = requestedUserId?.userId;

  // add to friend
  const confirm = await User.updateOne(
    { _id: myId },
    { $addToSet: { myFriendList: RequestedId } },
    { new: true }
  );

  // console.log(confirm);
  if (confirm?.acknowledged) {
    // added requested user friend list
    const addedRequestUserFriendList = await User.updateOne(
      { _id: RequestedId },
      { $addToSet: { myFriendList: myId } },
      { new: true }
    );
    // delete request
    if (addedRequestUserFriendList?.acknowledged) {
      // delete request from received request
      await User.updateOne(
        { _id: myId },
        { $pull: { receivedFriendRequest: RequestedId } }
      );
      // delete request from send request
      await User.updateOne(
        { _id: RequestedId },
        { $pull: { sendFriendRequest: myId } }
      );

      // add notification
      await Notification.create({userId:RequestedId,senderId:myId,type:"confirm Request"})

    }
  }

  return confirm;
};

const handleDeleteRequest = async (
  userId: string,
  requestedUserId: Record<string, string>
) => {
  const myId = userId;
  const RequestedId = requestedUserId?.userId;

  const res = await User.updateOne(
    { _id: myId },
    { $pull: { receivedFriendRequest: RequestedId } }
  );
  // delete request from send request
  await User.updateOne(
    { _id: RequestedId },
    { $pull: { sendFriendRequest: myId } }
  );

  return res;
};

const handleUnfriend = async (
  userId: string,
  requestedUserId: Record<string, string>
) => {
  const myId = userId;
  const RequestedId = requestedUserId?.userId;

  const res = await User.updateOne(
    { _id: myId },
    { $pull: { myFriendList: RequestedId } }
  );
  // delete request from send request
  await User.updateOne(
    { _id: RequestedId },
    { $pull: { myFriendList: myId } }
  );

  return res;
};

export const userService = {
  createUserInFoDB,
  updateProfile,
  getAlluser,
  getSingleUser,
  deleteUser,
  updateProfileImage,
  getMyInFo,
  sendFriendRequest,
  handleConfirmRequest,
  handleDeleteRequest,
  handleUnfriend
};
