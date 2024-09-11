import { Request, Response } from "express";
import {
  tLoginReturn,
  tUser,
  tUserBody,
  tUserReturn,
} from "../schemas/user.schema";

export interface iUserServices {
  register(body: tUserBody): Promise<tUserReturn>;
  login(user: tUser): Promise<tLoginReturn>;
  getUser(id: number): Promise<tUserReturn>;
}

export interface iUserControllers {
  register(req: Request, res: Response): Promise<Response>;
  login(req: Request, res: Response): Promise<Response>;
  getUser(req: Request, res: Response): Promise<Response>;
}
