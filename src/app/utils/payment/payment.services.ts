import verifyModel from "../../module/Verify/verify.model";
import { verifyPayment } from "./payment.utils";

const confirmationServices = async (payload: Record<string, string>) => {

  const verifyStatus=await verifyPayment(payload?.tranId)

  if (verifyStatus?.pay_status=="Successful") {
    
      const paymentInFo = {
        user: payload?.userId,
        totalPay: verifyStatus?.amount,
        paymentStatus: "Paid",
        transactionId: payload?.tranId,
        payment_processor:verifyStatus?.payment_processor,
        payment_type:verifyStatus?.payment_type,
        date:verifyStatus?.date
      };
    // console.log(paymentInFo);
      const res = await verifyModel.create(paymentInFo);
    //   console.log(res);
      return res;
  }
  return null
};

export const paymentServices = {
  confirmationServices,
};
