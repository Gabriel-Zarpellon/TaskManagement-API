import { Request, Response } from "express";
import { tCategory, tCategoryBody } from "../schemas/category.schema";

export interface iCategoryServices {
  create(body: tCategoryBody): Promise<tCategory>;
  delete(id: number): Promise<void>;
}

export interface iCategoryControllers {
  create(req: Request, res: Response): Promise<Response>;
  delete(req: Request, res: Response): Promise<Response>;
}
