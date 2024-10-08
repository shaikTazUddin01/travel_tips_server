import { Request, Response } from 'express';
import { verifyService } from './verify.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
// import { orderService } from './order.service';

 const createVerifyController = async (req: Request, res: Response) => {
    try {
        // const paymentAmount = req.body;
        const {userId}=req.user
        const newOrder = await verifyService.createVerify(req.body,userId);
        res.status(201).json({
            success: true,
            message: "Order created successfully!",
            data: newOrder
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: (error as Error).message,
            error
        });
    }
};

// get all verify info
const getAllVerifyInFo = catchAsync(async (req, res) => {
 
    const result = await verifyService.getAllVerifyfromDB();
  
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "retrieve success",
      data: result,
    });
  });

export const verifyController={
    createVerifyController,
    getAllVerifyInFo
}