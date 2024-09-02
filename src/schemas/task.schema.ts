import { z } from "zod";
import { categorySchema } from "./category.schema";

export const taskSchema = z.object({
  id: z.number().positive(),
  title: z.string().min(1),
  content: z.string().min(1),
  finished: z.boolean().default(false),
  category: categorySchema.nullable(),
});

export type tTask = z.infer<typeof taskSchema>;

export const taskReturnSchema = taskSchema
  .omit({ category: true })
  .extend({ categoryId: z.number().positive().optional().nullable() });

export type tTaskReturn = z.infer<typeof taskReturnSchema>;

export const taskBodySchema = taskReturnSchema.omit({
  id: true,
  finished: true,
});

export type tTaskBody = z.infer<typeof taskBodySchema>;

export const taskUpdateSchema = taskReturnSchema.omit({ id: true }).partial();

export type tTaskUpdateBody = z.infer<typeof taskUpdateSchema>;
