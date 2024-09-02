import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/appError";

export class IsBodyCategoryValid {
  static async execute(req: Request, res: Response, next: NextFunction) {
    if (req.body.categoryId) {
      const found = await prisma.category.findFirst({
        where: { id: Number(req.body.categoryId) },
      });

      if (!found) {
        throw new AppError(404, "Category not found");
      }
    }
    next();
  }
}
