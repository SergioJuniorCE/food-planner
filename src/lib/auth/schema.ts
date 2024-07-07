import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().min(2).max(50).optional(),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  confirmPassword: z.string().min(6, 'Password must be at least 6 characters long')
});

export type RegisterSchema = typeof registerSchema;