import { model, Schema, UpdateQuery } from "mongoose";
import { IUSER } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";
import { defaultUserImage } from "../../constant/userRole";

const userSchema = new Schema<IUSER>({
  name: { type: String, required: true },
  userName: { type: String },
  email: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  password: { type: String, required: true },
  image: { type: String, required: true, default: defaultUserImage },
  age: { type: Number, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  role: { type: String, enum: ["USER", "ADMIN"], required: true },
  phoneNumber: { type: String, required: true },
  isVerify: { type: Boolean, default: false },
  status: { type: String, enum: ["Active", "Blocked"], default: "Active" },
  sendFriendRequest: {
    type: [Schema.Types.ObjectId],
    ref: "User",
    default: [],
  },
  receivedFriendRequest: {
    type: [Schema.Types.ObjectId],
    ref: "User",
    default: [],
  },
  myFriendList: { type: [Schema.Types.ObjectId], ref: "User", default: [] },
});

userSchema.pre("save", async function (next) {
  const user = this;
  // console.log('--------------->>>>>----');
  user.password = await bcrypt.hash(user?.password, Number(config.saltRounds));
  next();
});

// Pre-update middleware for hashing password when updating
userSchema.pre("updateOne", async function (next) {
  const update = this.getUpdate() as UpdateQuery<IUSER>;

  if (update?.password) {
    update.password = await bcrypt.hash(
      update.password,
      Number(config.saltRounds)
    );
  }

  next();
});

userSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret?.password;
    return ret;
  },
});

export const User = model<IUSER>("User", userSchema);
