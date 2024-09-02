import "reflect-metadata";
import { Router } from "express";
import { container } from "tsyringe";
import { CategoryServices } from "../services/category.services";
import { CategoryControllers } from "../controllers/category.controllers";
import { ValidateBody } from "../middlewares/validateBody.middleware";
import { categoryBodySchema } from "../schemas/category.schema";
import { IsCategoryIdValid } from "../middlewares/isCategoryIdValid.middleware";

export const categoryRouter = Router();

container.registerSingleton("CategoryServices", CategoryServices);
const categoryControllers = container.resolve(CategoryControllers);

categoryRouter.post("/", ValidateBody.execute(categoryBodySchema), (req, res) =>
  categoryControllers.create(req, res)
);

categoryRouter.delete("/:id", IsCategoryIdValid.execute, (req, res) =>
  categoryControllers.delete(req, res)
);
