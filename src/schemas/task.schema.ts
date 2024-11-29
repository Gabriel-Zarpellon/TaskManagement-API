import { z } from "zod";
import { categorySchema } from "./category.schema";

export const taskSchema = z.object({
  id: z.number().positive(),
  title: z.string().min(1),
  content: z.string().min(1),
  finished: z.boolean().default(false),
  categoryId: z.number().positive().optional().nullable(),
});

export const taskReturnSchema = taskSchema
  .extend({
    category: categorySchema.nullable(),
  })
  .omit({ categoryId: true });

export const taskBodySchema = taskSchema.omit({ id: true });

export const taskUpdateSchema = taskSchema.omit({ id: true }).partial();

export type tTask = z.infer<typeof taskSchema>;

export type tTaskReturn = z.infer<typeof taskReturnSchema>;

export type tTaskBody = z.infer<typeof taskBodySchema>;

export type tTaskUpdate = z.infer<typeof taskUpdateSchema>;
