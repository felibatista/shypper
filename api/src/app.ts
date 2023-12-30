require("dotenv").config();

import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import urlRoute from "./routes/url.route";
import connectDB from "./orm";

const app = express();

app.use(cookieParser());
app.use(express.json());
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use(
  cors({
    origin: "*",
  })
);

app.use("/api/url", urlRoute);

app.get("/api/healthchecker", (req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    message: "SHYPPER API is running",
  });
});

// UnKnown Routes
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  err.status = err.status || "error";
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

const port = process.env.PORT || "8000";

app.listen(parseInt(port), "0.0.0.0", async () => {
  console.log(`✅ Server started on port: ${port}`);
  connectDB();
});
