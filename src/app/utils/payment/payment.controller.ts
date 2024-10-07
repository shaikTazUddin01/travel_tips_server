import { Request, Response } from "express"
import { paymentServices } from "./payment.services";

const confirmationController=async(req:Request,res:Response)=>{
    console.log(req.query);
    const result = await paymentServices.confirmationServices(req.query as Record<string,string>)
    res.send(`<h1>payment success</h1>`)
}

export const paymentController={
    confirmationController
}