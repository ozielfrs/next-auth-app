import { getVerificationTokenByUserId } from '@/data/verification';
import { db } from '@/lib/db';
import { v4 } from 'uuid';

export const generateVerificationTokenByUserId = async (userId: string) => {
  const token = v4();
  const expiresAt = new Date(new Date().getTime() + 60 * 60 * 1000);

  const existingToken = await getVerificationTokenByUserId(userId);

  if (existingToken)
    await db.verificationToken.delete({
      where: {
        id: existingToken.id
      }
    });

  const verificationToken = await db.verificationToken.create({
    data: {
      token,
      expiresAt,
      userId
    }
  });

  return verificationToken;
};
