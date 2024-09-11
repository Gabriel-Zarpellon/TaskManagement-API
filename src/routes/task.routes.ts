import "reflect-metadata";
import { Router } from "express";
import { container } from "tsyringe";
import { TaskServices } from "../services/task.services";
import { TaskControllers } from "../controllers/task.controllers";
import { ValidateBody } from "../middlewares/validateBody.middleware";
import { taskBodySchema, taskUpdateSchema } from "../schemas/task.schema";
import { IsTaskIdValid } from "../middlewares/isTaskIdValid.middleware";
import { IsBodyCategoryValid } from "../middlewares/isBodyCategoryValid.middleware";
import { ValidateToken } from "../middlewares/validateToken.middleware";
import { ValidateTaskOwner } from "../middlewares/validateTaskOwner.middleware";



export const taskRouter = Router();

container.registerSingleton("TaskServices", TaskServices);
const taskControllers = container.resolve(TaskControllers);

taskRouter.use(ValidateToken.execute);
taskRouter.post("/", ValidateBody.execute(taskBodySchema), IsBodyCategoryValid.execute, (req, res) => taskControllers.create(req, res));
taskRouter.get("/", (req, res) => taskControllers.findMany(req, res));
taskRouter.get("/:id", IsTaskIdValid.execute, ValidateTaskOwner.execute, (req, res) => taskControllers.findOne(req, res));
taskRouter.patch("/:id", IsTaskIdValid.execute, ValidateTaskOwner.execute, ValidateBody.execute(taskUpdateSchema), (req, res) => taskControllers.update(req, res));
taskRouter.delete("/:id", IsTaskIdValid.execute, ValidateTaskOwner.execute, (req, res) => taskControllers.delete(req, res));
