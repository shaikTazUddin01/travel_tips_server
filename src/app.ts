// import package
import express, { Request, Response } from "express";
import cors from "cors";
import router from "./app/router";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";
import cookieParser from "cookie-parser";
// import globalErrorHandler from './app/middleware/globalErrorHandler'

const app = express();
//middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//router
app.use("/api/v1", router);

// check server conncetion
app.get("/", (req: Request, res: Response) => {
  res.send("The server is connect successfully");
});

//error middleware
app.use(globalErrorHandler);
app.use(notFound);

export default app;
