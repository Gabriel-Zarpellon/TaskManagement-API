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
  async create(body: tTaskBody, id: number): Promise<tTaskReturn> {
    const data = await prisma.task.create({
      data: { ...body, userId: id },
    });

    return data;
  }

  async findMany(userId: number, categoryName?: string): Promise<tTask[]> {
    if (categoryName) {
      const categories = await prisma.task.findMany({
        where: { category: { name: categoryName } },
        include: { category: true },
      });

      const data = categories.filter((category) => category.userId == userId);

      return taskSchema.array().parse(data);
    }

    const tasks = await prisma.task.findMany({ include: { category: true } });

    const data = tasks.filter((task) => task.userId == userId);

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
