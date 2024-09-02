import { inject, injectable } from "tsyringe";
import { TaskServices } from "../services/task.services";
import { Request, Response } from "express";
import { iTaskControllers } from "../interfaces/task.interface";

@injectable()
export class TaskControllers implements iTaskControllers {
  constructor(@inject("TaskServices") private taskServices: TaskServices) {}

  async create(req: Request, res: Response): Promise<Response> {
    const response = await this.taskServices.create(req.body);

    return res.status(201).json(response);
  }

  async findMany(req: Request, res: Response): Promise<Response> {
    const response = await this.taskServices.findMany(req.query.category as string);

    return res.status(200).json(response);
  }

  async findOne(req: Request, res: Response): Promise<Response> {
    const response = await this.taskServices.findOne(Number(req.params.id));

    return res.status(200).json(response);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const response = await this.taskServices.update(
      Number(req.params.id),
      req.body
    );

    return res.status(200).json(response);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const response = await this.taskServices.delete(Number(req.params.id));

    return res.status(204).json();
  }
}
