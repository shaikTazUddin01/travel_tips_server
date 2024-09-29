import { model, Schema } from "mongoose";
import { IUSER } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const userSchema = new Schema<IUSER>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  password: { type: String, required: true },
  image: { type: String, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  role: { type: String, enum: ["USER", "ADMIN"], required: true },
  phoneNumber: { type: String, required: true },
});

userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(user?.password, Number(config.saltRounds));
  next();
});

userSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret?.password;
    return ret;
  },
});

export const User = model<IUSER>("User", userSchema);
