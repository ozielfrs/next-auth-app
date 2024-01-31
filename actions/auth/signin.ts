'use server';

import { signIn } from '@/auth';
import { getUserByEmail } from '@/data/user';
import {
  get2FAVerificationTokenByUserId,
  update2FAVerificationTokenStatusByUserId
} from '@/data/verification';
import {
  send2FAVerificationEmail,
  sendEmailVerificationEmail
} from '@/lib/mail';
import {
  generate2FAVerificationTokenByUserId,
  generateEmailVerificationTokenByUserId
} from '@/lib/tokens';
import { DEFAULT_LANDING_PAGE_URL } from '@/routes';
import { SignInSchema } from '@/schemas';
import { AuthError } from 'next-auth';
import { z } from 'zod';
import bcrypt from 'bcryptjs';

export const ValidateUser = async (values: z.infer<typeof SignInSchema>) => {
  const validatedFields = SignInSchema.safeParse(values);

  if (!validatedFields.success) return { error: 'Invalid fields!' };

  const { email, password, token } = validatedFields.data;

  const user = await getUserByEmail(email);

  if (!user) return { error: 'Invalid credentials!' };

  if (!user.emailVerified) {
    const verificationToken = await generateEmailVerificationTokenByUserId(
      user.id
    );

    await sendEmailVerificationEmail(email, verificationToken.token);

    return { success: `Verify your email!` };
  }

  if (user.enabled2FA) {
    if (token) {
      const twoFAToken = await get2FAVerificationTokenByUserId(user.id);

      if (!twoFAToken) return { error: 'Invalid 2FA token!' };
      if (twoFAToken.token !== token) return { error: 'Invalid 2FA token!' };

      const hasExpired = twoFAToken.expiresAt < new Date();
      if (hasExpired) return { error: '2FA token has expired!' };

      await update2FAVerificationTokenStatusByUserId(user.id);
    } else {
      const passwordCheck = await bcrypt.compare(password, user.password || '');

      if (!passwordCheck) return { error: 'Invalid credentials!' };

      const twoFactorToken = await generate2FAVerificationTokenByUserId(
        user.id
      );

      await send2FAVerificationEmail(email, twoFactorToken.token);

      return { twoFA: true };
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
          return { error: 'Invalid credentials!' };
        case 'AuthorizedCallbackError':
          return { error: 'Access denied!' };
        default:
          return { error: 'Unknown error!' };
      }
    }
    throw e;
  }

  return { error: 'Something went wrong!' };
};
