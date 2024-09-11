import { Router } from "express";
import { container } from "tsyringe";
import { UserServices } from "../services/user.services";
import { UserControllers } from "../controllers/user.controllers";
import { ValidateBody } from "../middlewares/validateBody.middleware";
import { userBodySchema, userLoginSchema } from "../schemas/user.schema";
import { ValidateEmail } from "../middlewares/validateEmail.middleware";
import { ValidateLogin } from "../middlewares/validateLogin.middleware";
import { ValidateToken } from "../middlewares/validateToken.middleware";

export const userRouter = Router();

container.registerSingleton("UserServices", UserServices);
const userControllers = container.resolve(UserControllers);

userRouter.post(
  "/",
  ValidateBody.execute(userBodySchema),
  ValidateEmail.execute,
  (req, res) => userControllers.register(req, res)
);
userRouter.post(
  "/login",
  ValidateBody.execute(userLoginSchema),
  ValidateLogin.execute,
  (req, res) => userControllers.login(req, res)
);
userRouter.get("/profile", ValidateToken.execute, (req, res) =>
  userControllers.getUser(req, res)
);
