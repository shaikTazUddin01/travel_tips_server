import { Request, Response } from 'express';
import { verifyService } from './verify.service';
// import { orderService } from './order.service';

export const createVerifyController = async (req: Request, res: Response) => {
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
