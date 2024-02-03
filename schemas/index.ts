import { UserRole } from '@prisma/client';
import { z } from 'zod';

export const SignInSchema = z.object({
  email: z.string().email({ message: 'Email required' }),
  password: z.string().min(6, { message: 'Password required' }),
  token: z.optional(z.string().toUpperCase())
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

export const SettingsSchema = z
  .object({
    email: z.optional(z.string().email({ message: 'Email required' })),
    name: z.optional(z.string().min(2, { message: 'Name required' })),
    password: z.optional(z.string().min(6, { message: 'Password too small' })),
    newPassword: z.optional(
      z.string().min(6, { message: 'Password too small' })
    ),
    enabled2FA: z.optional(z.boolean()),
    role: z.optional(z.enum([UserRole.USER, UserRole.ADMIN]))
  })
  .refine(
    data => {
      if (
        (data.password && !data.newPassword) ||
        (!data.password && data.newPassword)
      ) {
        return false;
      }
      return true;
    },
    {
      message: 'Both password and new password required',
      path: ['password', 'newPassword']
    }
  );
