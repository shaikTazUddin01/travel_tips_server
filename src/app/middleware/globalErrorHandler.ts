import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import config from '../config'
// import { handleCastError } from "../errors/handleCastError";
// import app from "../app";

const globalErrorHandler:any = (err:any, req:Request, res:Response, next:NextFunction) => {
  //setting default value
  let statusCode = err.statusCode || 500
  let message = err.message || 'something went wrong.!'

  return res.status(statusCode).json({
    success: false,
    message,
    error:err
  })
}

export default globalErrorHandler
