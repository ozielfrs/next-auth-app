'use server';

import { getUserByEmail, getUserById } from '@/data/user';
import { getEmailVerificationTokenByToken } from '@/data/verification';
import { db } from '@/lib/db';
import { sendPasswordVerificationEmail } from '@/lib/mail';
import { generatePasswordVerificationTokenByUserId } from '@/lib/tokens';
import { PasswordResetSchema } from '@/schemas';
import { z } from 'zod';

export const SendEmailVerificationLink = async (token: string) => {
  const existingToken = await getEmailVerificationTokenByToken(token);

  if (!existingToken) {
    return { success: '', error: 'Token not found!' };
  }

  const hasExpired = new Date() > existingToken.expiresAt;

  if (hasExpired) {
    return { success: '', error: 'Token has expired!' };
  }

  const user = await getUserById(existingToken.userId);

  if (!user) {
    return { success: '', error: 'User not found!' };
  }

  await db.user.update({
    where: { id: user.id },
    data: { emailVerified: new Date(), email: user.email }
  });

  await db.emailVerificationToken.delete({ where: { id: existingToken.id } });

  return { success: 'Email verified!', error: '' };
};

export const SendEmailResetPasswordLink = async (
  data: z.infer<typeof PasswordResetSchema>
) => {
  const validData = PasswordResetSchema.safeParse(data);

  if (!validData.success) {
    return {
      success: '',
      error: 'Invalid data'
    };
  }

  const { email } = validData.data;

  const user = await getUserByEmail(email);

  if (!user) {
    return {
      success: '',
      error: 'Email not found'
    };
  }

  //TODO: Generate and send token via email
  const passwordVerificationToken =
    await generatePasswordVerificationTokenByUserId(user.id);

  await sendPasswordVerificationEmail(email, passwordVerificationToken.token);

  return {
    success: 'Password reset email sent!',
    error: ''
  };
};
