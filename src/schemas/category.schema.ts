import { z } from "zod";

export const categorySchema = z.object({
  id: z.number().positive(),
  name: z.string().min(1),
});

export type tCategory = z.infer<typeof categorySchema>;

export const categoryBodySchema = categorySchema.omit({ id: true });

export type tCategoryBody = z.infer<typeof categoryBodySchema>;
