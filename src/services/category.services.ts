import { prisma } from "../database/prisma";
import "reflect-metadata";
import { iCategoryServices } from "../interfaces/category.interface";
import { tCategoryBody, tCategory } from "../schemas/category.schema";
import { injectable } from "tsyringe";

@injectable()
export class CategoryServices implements iCategoryServices {
  async create(body: tCategoryBody, userId: number): Promise<tCategory> {
    const data = await prisma.category.create({ data: {...body, userId: userId} });

    return data;
  }

  async delete(id: number): Promise<void> {
    const data = await prisma.category.delete({ where: { id } });
  }
}
