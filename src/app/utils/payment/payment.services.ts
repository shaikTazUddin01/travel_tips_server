import { User } from "../../module/User/user.model";
import { VerifyModel } from "../../module/Verify/verify.model";
// import verifyModel from "../../module/Verify/verify.model";
import { verifyPayment } from "./payment.utils";

const confirmationServices = async (payload: Record<string, string>) => {
  const status = payload?.status;

  if (status == "success") {
    const verifyStatus = await verifyPayment(payload?.tranId);
    if (verifyStatus?.pay_status == "Successful") {
      const paymentInFo = {
        user: payload?.userId,
        totalPay: verifyStatus?.amount,
        paymentStatus: "Paid",
        transactionId: payload?.tranId,
        payment_processor: verifyStatus?.payment_processor,
        payment_type: verifyStatus?.payment_type,
        date: verifyStatus?.date,
      };

      const res: any = await VerifyModel.create(paymentInFo);

      if (res) {
        await User.findByIdAndUpdate(
          res?.user,
          { isVerify: true },
          { new: true }
        );
      }
      return `
      <div style="border: 1px solid #4CAF50; border-radius: 8px; padding: 20px; max-width: 300px; text-align: center; background-color: #f9f9f9; margin: auto;">
        <h1 style="color: #4CAF50;">Payment Success</h1>
        <p style="font-size: 16px; margin: 10px 0;">Thank you for your payment!</p>
        <a href="" style="padding: 10px; background-color: #4CAF50; color: white; border-radius: 5px; text-decoration: none;">Go Home</a>
      </div>
    `;
    }
  }
  if (status === "fail") {
    return `
      <div style="border: 1px solid #f44336; border-radius: 8px; padding: 20px; max-width: 300px; text-align: center; background-color: #f9f9f9; margin: auto;">
        <h1 style="color: #f44336;">Payment Failed</h1>
        <p style="font-size: 16px; margin: 10px 0;">Please try again!</p>
        <a href="" style="padding: 10px; background-color: #f44336; color: white; border-radius: 5px; text-decoration: none;">Go Home</a>
      </div>
    `;
  }

  if (status === "cancel") {
    return `
      <div style="border: 1px solid #ff9800; border-radius: 8px; padding: 20px; max-width: 300px; text-align: center; background-color: #f9f9f9; margin: auto;">
        <h1 style="color: #ff9800;">Payment Canceled</h1>
        <p style="font-size: 16px; margin: 10px 0;">Your payment has been canceled. Please try again.</p>
        <a href="" style="padding: 10px; background-color: #ff9800; color: white; border-radius: 5px; text-decoration: none;">Go Home</a>
      </div>
    `;
  }

  return null;
};

export const paymentServices = {
  confirmationServices,
};
