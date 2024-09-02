import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/appError";

export class IsTaskIdValid {
  static async execute(req: Request, res: Response, next: NextFunction) {
    const found = await prisma.task.findFirst({
      where: { id: Number(req.params.id) },
    });

    if (!found) {
      throw new AppError(404, "Task not found");
    }

    next();
  }
}
