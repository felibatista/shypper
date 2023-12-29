import { NextFunction, Request, Response } from "express";

export const test = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.headers);
    res.status(200).json({
      status: "success",
      message: req.headers,
    });
  } catch (err: any) {
    next(err);
  }
};