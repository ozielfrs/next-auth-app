'use server';

import { signIn } from '@/auth';
import { getUserByEmail } from '@/data/user';
import { sendEmailVerificationEmail } from '@/lib/mail';
import { generateEmailVerificationTokenByUserId } from '@/lib/tokens';
import { DEFAULT_LANDING_PAGE_URL } from '@/routes';
import { SignInSchema } from '@/schemas';
import { AuthError } from 'next-auth';
import { z } from 'zod';

export const ValidateUser = async (values: z.infer<typeof SignInSchema>) => {
  const validatedFields = SignInSchema.safeParse(values);

  if (!validatedFields.success) {
    return { success: '', error: 'Invalid fields!' };
  }

  const { email, password } = validatedFields.data;

  const user = await getUserByEmail(email);

  if (user) {
    if (!user.emailVerified) {
      const verificationToken = await generateEmailVerificationTokenByUserId(
        user.id
      );

      await sendEmailVerificationEmail(email, verificationToken.token);

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
        case 'AuthorizedCallbackError':
          return { success: '', error: 'Access denied!' };
        default:
          return { success: '', error: 'Unknown error!' };
      }
    }
    throw e;
  }

  return { success: '', error: 'You need to verify your email' };
};
