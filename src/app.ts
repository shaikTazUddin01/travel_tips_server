// import package
import express, { Request, Response } from "express";
import cors from "cors";
import router from "./app/router";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";
// import globalErrorHandler from './app/middleware/globalErrorHandler'

const app = express();
//middleware
app.use(cors());
app.use(express.json());

//router
app.use("/api/v1", router);
//error middleware
app.use(globalErrorHandler);
app.use(notFound);

app.get("/", (req: Request, res: Response) => {
  res.send("The server is connect successfully");
});

export default app;
