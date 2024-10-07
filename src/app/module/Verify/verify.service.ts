import { initiatePayment } from "../../utils/payment/payment.utils";
import { User } from "../User/user.model";

const createVerify = async (payload:Record<string,number>,userId:string) => {
    // const { user } = userData;
    console.log(userId);

    let totalAmount = payload.paymentAmount;
    const userInfo =await User.findById(userId)
    // console.log(userInfo);

    // Calculate the total price
    // const productDetails = await Promise.all(
    //     products.map(async (item: any) => {
    //         const product = await Product.findById(item.product);
    //         if (product) {
    //             totalPrice += product.price * item.quantity;
    //             return {
    //                 product: product._id,
    //                 quantity: item.quantity
    //             };
    //         } else {
    //             throw new Error('Product not found');
    //         }
    //     })
    // );

    const transactionId = `TXN-${userInfo?._id}-${Date.now()}`;

    // const order = {
    //     userInfo,
    //     totalPrice,
    //     paymentStatus: 'Pending',
    //     transactionId
    // };

    // await order.save();

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

    console.log(paymentSession)
//   const paymentSection =  await initiatePayment()
//  console.log(paymentSection);
    return paymentSession;
};


export const verifyService = {
    createVerify
}