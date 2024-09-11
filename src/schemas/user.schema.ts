import { z } from "zod";

export const userSchema = z.object({
  id: z.number().positive(),
  name: z.string().min(1),
  email: z.string().min(1).email(),
  password: z.string().min(1),
});

export type tUser = z.infer<typeof userSchema>;

export const userBodySchema = userSchema.omit({ id: true });

export type tUserBody = z.infer<typeof userBodySchema>;

export const userReturnSchema = userSchema.omit({ password: true });

export type tUserReturn = z.infer<typeof userReturnSchema>;

export const userLoginSchema = userSchema.omit({ id: true, name: true });

export type tUserLogin = z.infer<typeof userLoginSchema>;

export type tLoginReturn = {
  accessToken: string;
  user: tUserReturn;
};
