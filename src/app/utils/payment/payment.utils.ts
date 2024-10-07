import axios from "axios";
import config from "../../config";

export const initiatePayment = async (paymentData:any) => {
  const response = await axios.post(config.payment_Url!, {
    store_id:config.store_id,
    signature_key: config.signature_key,
    tran_id: paymentData.transactionId,
    success_url: `http://localhost:5000/api/v1/payment/confirmation?userId=${paymentData?.userId}&&tranId=${paymentData?.transactionId}`,
    fail_url: "http://www.merchantdomain.com/failedpage.html",
    cancel_url: "http://www.merchantdomain.com/cancellpage.html",
    amount: paymentData.totalAmount,
    currency: "BDT",
    desc: "Merchant Registration Payment",
    cus_name: paymentData?.custormerName,
    cus_email: paymentData?.customerEmail,
    cus_add1: paymentData?.customerAddress,
    cus_country: "Bangladesh",
    cus_phone: "+8801704",
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