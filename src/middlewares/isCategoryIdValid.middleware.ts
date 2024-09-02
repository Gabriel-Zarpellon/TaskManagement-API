import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/appError";

export class IsCategoryIdValid {
  static async execute(req: Request, res: Response, next: NextFunction) {
    const found = await prisma.category.findFirst({
      where: { id: Number(req.params.id) },
    });

    if (!found) {
      throw new AppError(404, "Category not found");
    }

    next();
  }
}

