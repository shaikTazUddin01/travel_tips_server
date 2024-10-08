import { initiatePayment } from "../../utils/payment/payment.utils";
import { User } from "../User/user.model";
import { VerifyModel } from "./verify.model";

const createVerify = async (payload:Record<string,number>,userId:string) => {

    let totalAmount = payload.paymentAmount;
    const userInfo =await User.findById(userId)
    const transactionId = `TXN-${userInfo?._id}-${Date.now()}`;

    const paymentData = {
        transactionId,
        totalAmount,
        userId,
        custormerName: userInfo?.name,
        customerEmail: userInfo?.email,
        customerPhone: userInfo?.phoneNumber,
        customerAddress: userInfo?.address
    }

    // //payment
    const paymentSession = await initiatePayment(paymentData);

    return paymentSession;
};

const getAllVerifyfromDB=async()=>{
    const res=await VerifyModel.find().populate('user')
    return res
}


export const verifyService = {
    createVerify,
    getAllVerifyfromDB
}