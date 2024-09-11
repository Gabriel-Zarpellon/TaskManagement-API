import { injectable } from "tsyringe";
import "reflect-metadata";
import {
  taskSchema,
  tTask,
  tTaskBody,
  tTaskReturn,
  tTaskUpdateBody,
} from "../schemas/task.schema";
import { prisma } from "../database/prisma";
import { iTaskServices } from "../interfaces/task.interface";

@injectable()
export class TaskServices implements iTaskServices {
  async create(body: tTaskBody): Promise<tTaskReturn> {
    const data = await prisma.task.create({
      data: body,
    });

    return data;
  }

  async findMany(categoryName?: string): Promise<tTask[]> {
    if (categoryName) {
      const data = await prisma.task.findMany({
        where: { category: { name: categoryName } },
        include: { category: true },
      });

      return taskSchema.array().parse(data);
    }

    const data = await prisma.task.findMany({ include: { category: true } });

    return taskSchema.array().parse(data);
  }

  async findOne(id: number): Promise<tTask> {
    const data = await prisma.task.findFirst({
      where: { id },
      include: { category: true },
    });

    return taskSchema.parse(data);
  }

  async update(id: number, body: tTaskUpdateBody): Promise<tTaskReturn> {
    const data = await prisma.task.update({ where: { id }, data: { ...body } });

    return data;
  }

  async delete(id: number): Promise<void> {
    await prisma.task.delete({ where: { id } });
  }
}
