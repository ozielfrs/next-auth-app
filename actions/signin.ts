'use server';

import { signIn } from '@/auth';
import { getUserByEmail } from '@/data/user';
import { generateVerificationTokenByUserId } from '@/lib/tokens';
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

  const user = await getUserByEmail(email);

  if (user) {
    if (!user.emailVerified) {
      console.log('User not verified');

      const verificationToken = await generateVerificationTokenByUserId(
        user.id
      );

      return { success: '', error: `Verify your email!` };
    }
  }

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

  return { success: '', error: 'You need to verify your email' };
};
