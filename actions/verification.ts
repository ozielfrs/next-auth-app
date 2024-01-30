'use server';

import { getUserById } from '@/data/user';
import { getVerificationTokenByToken } from '@/data/verification';
import { db } from '@/lib/db';

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

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

  await db.verificationToken.delete({ where: { id: existingToken.id } });

  return { success: 'Email verified!', error: '' };
};
