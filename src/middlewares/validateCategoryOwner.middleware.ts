import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/appError";

export class ValidateCategoryOwner {
  static async execute(req: Request, res: Response, next: NextFunction) {
    const userId = res.locals.decode.id;
    const categoryId = req.params.id;

    const category = await prisma.category.findFirst({
      where: { id: Number(categoryId) },
    });

    if (category?.userId != userId) {
      throw new AppError(403, "This user is not the category owner");
    }

    return next();
  }
}
