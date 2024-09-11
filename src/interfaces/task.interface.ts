import { Request, Response } from "express";
import { tTask, tTaskBody, tTaskReturn, tTaskUpdateBody } from "../schemas/task.schema";

export interface iTaskServices {
  create(body: tTaskBody, id: number): Promise<tTaskReturn>;
  findMany(userId: number, categoryName?: string): Promise<tTask[]>;
  findOne(id: number): Promise<tTask>;
  update(id: number, body: tTaskUpdateBody): Promise<tTaskReturn>;
  delete(id: number): Promise<void>;
}

export interface iTaskControllers {
  create(req: Request, res: Response): Promise<Response>;
  findMany(req: Request, res: Response): Promise<Response>;
  findOne(req: Request, res: Response): Promise<Response>;
  update(req: Request, res: Response): Promise<Response>;
  delete(req: Request, res: Response): Promise<Response>;
}
