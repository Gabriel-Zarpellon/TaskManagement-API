import { Request, Response } from "express";
import { tTask, tTaskBody, tTaskUpdateBody } from "../schemas/task.schema";

export interface iTaskServices {
  create(body: tTaskBody): Promise<tTask>;
  findMany(): Promise<tTask[]>;
  findOne(id: number): Promise<tTask>;
  update(id: number, body: tTaskUpdateBody): Promise<tTask>;
  delete(id: number): Promise<void>;
}

export interface iTaskControllers {
  create(req: Request, res: Response): Promise<Response>;
  findMany(req: Request, res: Response): Promise<Response>;
  findOne(req: Request, res: Response): Promise<Response>;
  update(req: Request, res: Response): Promise<Response>;
  delete(req: Request, res: Response): Promise<Response>;
}
