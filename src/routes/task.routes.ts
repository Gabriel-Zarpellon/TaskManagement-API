import "reflect-metadata";
import { Router } from "express";
import { container } from "tsyringe";
import { TaskServices } from "../services/task.services";
import { TaskControllers } from "../controllers/task.controllers";
import { ValidateBody } from "../middlewares/validateBody.middleware";
import { taskBodySchema, taskUpdateSchema } from "../schemas/task.schema";
import { IsTaskIdValid } from "../middlewares/isTaskIdValid.middleware";

export const taskRouter = Router();

container.registerSingleton("TaskServices", TaskServices);
const taskControllers = container.resolve(TaskControllers);

taskRouter.post("/", ValidateBody.execute(taskBodySchema), (req, res) => taskControllers.create(req, res));
taskRouter.get("/", (req, res) => taskControllers.findMany(req, res));
taskRouter.get("/:id", IsTaskIdValid.execute, (req, res) => taskControllers.findOne(req, res));
taskRouter.patch("/:id", IsTaskIdValid.execute, ValidateBody.execute(taskUpdateSchema), (req, res) => taskControllers.update(req, res));
taskRouter.delete("/:id", IsTaskIdValid.execute, (req, res) => taskControllers.delete(req, res));
