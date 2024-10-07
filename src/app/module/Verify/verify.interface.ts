import { Types } from "mongoose";

export interface IVerify extends Document {
  user: Types.ObjectId;
  totalPay: number;
  paymentStatus: string;
  transactionId: string;
  payment_processor: string;
  payment_type: string;
  date: Date;
}
