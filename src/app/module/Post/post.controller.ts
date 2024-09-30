import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { postServices } from "./post.services";

const createPost=catchAsync(async(req,res)=>{
    const user =req.headers.authorization
    const result=await postServices.createPost(req.body,user as string)

    sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message: "post created success",
        data: result,
    })
})
const getAllPost=catchAsync(async(req,res)=>{
   
    const result=await postServices.getAllPost()

    sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message: "post retrieve success",
        data: result,
    })
})


export const postcontroller={
    createPost,
    getAllPost
}