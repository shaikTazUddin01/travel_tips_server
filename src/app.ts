// import package
import express, { Request, Response } from "express";
import cors from "cors";
import router from "./app/router";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";
import cookieParser from "cookie-parser";
// import bodyParser from "body-parser";
// import globalErrorHandler from './app/middleware/globalErrorHandler'

const app = express();
//middleware
app.use(cors({origin:["https://travel-tips-seven.vercel.app","http://localhost:3000"],credentials:true}));
app.use(express.json());
app.use(cookieParser());
// app.use(bodyParser.urlencoded({ extended: false }));

//router
app.use("/api/v1", router);

//global error middleware
app.use(globalErrorHandler);


// check server conncetion
app.get("/", (req: Request, res: Response) => {
  res.send("The server is connect successfully");
});
// not found middleware
app.use(notFound);

export default app;
