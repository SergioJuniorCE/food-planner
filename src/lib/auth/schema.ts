import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().min(2).max(50).optional(),
  email: z.string().email(),
  password: z.string().min(6).max(50).optional(),
});

export type RegisterSchema = typeof registerSchema;