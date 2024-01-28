'use server';

import { signIn } from '@/auth';
import { DEFAULT_LANDING_PAGE_URL } from '@/routes';
import { SignInSchema } from '@/schemas';
import { AuthError } from 'next-auth';
import { z } from 'zod';

export const SignIn = async (values: z.infer<typeof SignInSchema>) => {
  const validatedFields = SignInSchema.safeParse(values);

  if (!validatedFields.success) {
    return { success: '', error: 'Invalid fields!' };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LANDING_PAGE_URL.path
    });
  } catch (e) {
    if (e instanceof AuthError) {
      switch (e.type) {
        case 'CredentialsSignin':
          return { success: '', error: 'Invalid credentials!' };
        default:
          return { success: '', error: 'Unknown error!' };
      }
    }
    throw e;
  }

  return { success: 'Signed In!', error: '' };
};
