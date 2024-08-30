import { z } from "zod";

export const taskSchema = z.object({
  id: z.number().positive(),
  title: z.string().min(1),
  content: z.string().min(1),
  finished: z.boolean().default(false),
  categoryId: z.number().optional().nullable(),
});

export type tTask = z.infer<typeof taskSchema>;

export const taskBodySchema = taskSchema.omit({ id: true, finished: true });

export type tTaskBody = z.infer<typeof taskBodySchema>;

export const taskUpdateSchema = taskSchema.omit({ id: true }).partial();

export type tTaskUpdateBody = z.infer<typeof taskUpdateSchema>;
