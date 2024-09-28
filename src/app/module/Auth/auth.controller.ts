import { Request, Response } from "express"
import { authService } from "./auth.service"

const createAuth=async(req:Request,res:Response)=>{
    const result=await authService.createAuthInFoDB(req.body)

    res.json({
        success:true,
        data:result
    })
}

export const authController={
    createAuth
}