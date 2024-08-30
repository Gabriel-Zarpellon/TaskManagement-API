import { injectable } from "tsyringe";
import "reflect-metadata";
import { tTask, tTaskBody, tTaskUpdateBody } from "../schemas/task.schema";
import { prisma } from "../database/prisma";
import { iTaskServices } from "../interfaces/task.interface";

@injectable()
export class TaskServices implements iTaskServices {
  async create(body: tTaskBody): Promise<tTask> {
    const data = await prisma.task.create({
      data: body,
    });

    return data;
  }

  async findMany(): Promise<tTask[]> {
    const data = await prisma.task.findMany();

    return data;
  }

  async findOne(id: number): Promise<tTask> {
    const data = await prisma.task.findFirst({ where: { id: id } });

    return data as tTask;
  }

  async update(id: number, body: tTaskUpdateBody): Promise<tTask> {
    const data = await prisma.task.update({ where: { id }, data: { ...body } });

    return data;
  }

  async delete(id: number): Promise<void> {
    await prisma.task.delete({ where: { id } });
  }
}
