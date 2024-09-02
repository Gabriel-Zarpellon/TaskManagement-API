import express, { json } from "express";
import helmet from "helmet";
import "express-async-errors";
import { taskRouter } from "./routes/task.routes";
import { HandleError } from "./middlewares/handleError.middleware";
import { categoryRouter } from "./routes/category.routes";

export const app = express();

app.use(json());

app.use(helmet());

app.use("/tasks", taskRouter);

app.use("/categories", categoryRouter);

app.use(HandleError.execute);
