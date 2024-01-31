import { z } from 'zod';

export const SignInSchema = z.object({
  email: z.string().email({ message: 'Email required' }),
  password: z.string().min(6, { message: 'Password required' }),
  token: z.string().optional()
});

export const SignUpSchema = z.object({
  email: z.string().email({ message: 'Email required' }),
  password: z.string().min(6, { message: 'Password too small' }),
  name: z.string().min(2, { message: 'Name required' })
});

export const PasswordResetSchema = z.object({
  email: z.string().email({ message: 'Email required' })
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, { message: 'Password too small' })
});
