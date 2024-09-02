import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/appError";
import { ZodError } from "zod";

export class HandleError {
  static execute(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message });
    } else if (error instanceof ZodError) {
      const data = {errors: error.issues}
      return res.status(400).json(data);
    } else {
      console.log(error);
      return res.status(500).json({ message: "Internal server error." });
    }
  }
}
