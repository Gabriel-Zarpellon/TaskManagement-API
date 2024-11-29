import { Request, Response } from "express";
import {
  tTask,
  tTaskBody,
  tTaskReturn,
  tTaskUpdate,
} from "../schemas/task.schema";

export interface iTaskServices {
  create(body: tTaskBody, id: number): Promise<tTask>;
  findMany(userId: number, categoryName?: string): Promise<tTaskReturn[]>;
  findOne(id: number): Promise<tTaskReturn>;
  update(id: number, body: tTaskUpdate): Promise<tTask>;
  delete(id: number): Promise<void>;
}

export interface iTaskControllers {
  create(req: Request, res: Response): Promise<Response>;
  findMany(req: Request, res: Response): Promise<Response>;
  findOne(req: Request, res: Response): Promise<Response>;
  update(req: Request, res: Response): Promise<Response>;
  delete(req: Request, res: Response): Promise<Response>;
}
