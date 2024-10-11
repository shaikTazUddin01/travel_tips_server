import axios from "axios";
import config from "../../config";

export const initiatePayment = async (paymentData:any) => {
  const response = await axios.post(config.payment_Url!, {
    store_id:config.store_id,
    signature_key: config.signature_key,
    tran_id: paymentData.transactionId,
    success_url: `https://travel-tips-server.vercel.app/api/v1/payment/confirmation?userId=${paymentData?.userId}&&tranId=${paymentData?.transactionId}&&status=success`,
    fail_url:  `https://travel-tips-server.vercel.app/api/v1/payment/confirmation?userId=${paymentData?.userId}&&tranId=${paymentData?.transactionId}&&status=fail`,
    cancel_url: `https://travel-tips-server.vercel.app/api/v1/payment/confirmation?userId=${paymentData?.userId}&&tranId=${paymentData?.transactionId}&&status=cancel`,
    amount: paymentData.totalAmount,
    currency: "BDT",
    desc: "Merchant Registration Payment",
    cus_name: paymentData?.custormerName,
    cus_email: paymentData?.customerEmail,
    cus_add1: paymentData?.customerAddress,
    cus_country: "Bangladesh",
    cus_phone: paymentData?.customerPhone,
    user_id:paymentData?.userId,
    type: "json",
  });
// console.log(response);
  return response.data
};

export const verifyPayment = async (tnxId: string) => {
    try {
        const response = await axios.get(config.verify_payment_url!, {
            params: {
                store_id: config.store_id,
                signature_key: config.signature_key,
                type: "json",
                request_id: tnxId
            }
        });

        return response.data;
    }
    catch (err) {
        throw new Error("Payment validation failed!")
    }
}