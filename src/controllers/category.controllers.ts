import { Request, Response } from "express";
import { iCategoryControllers } from "../interfaces/category.interface";
import { inject, injectable } from "tsyringe";
import { CategoryServices } from "../services/category.services";

@injectable()
export class CategoryControllers implements iCategoryControllers {
  constructor(
    @inject("CategoryServices") private categoryServices: CategoryServices
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    const response = await this.categoryServices.create(req.body);

    return res.status(201).json(response);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    await this.categoryServices.delete(Number(req.params.id));

    return res.status(204).json();
  }
}
