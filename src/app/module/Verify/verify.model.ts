import mongoose, { Schema, Document } from "mongoose";
import { IVerify } from "./verify.interface";

const verifySchema: Schema = new Schema<IVerify>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    totalPay: {
      type: Number,
      required: true,
      default: 50,
    },
    paymentStatus: { type: String, required: true },
    transactionId: { type: String, required: true },
    payment_processor: { type: String, required: true },
    payment_type: { type: String, required: true },
    date: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IVerify>("Verify", verifySchema);
