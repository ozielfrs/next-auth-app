'use server';

import { getPasswordVerificationTokenByToken } from '@/data/verification';
import { db } from '@/lib/db';
import { NewPasswordSchema } from '@/schemas';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

export const ResetPassword = async (
  data: z.infer<typeof NewPasswordSchema>,
  token: string
) => {
  if (!token) {
    return {
      success: '',
      error: 'Invalid token'
    };
  }

  const validData = NewPasswordSchema.safeParse(data);

  if (!validData.success) {
    return {
      success: '',
      error: 'Invalid data'
    };
  }

  const existingToken = await getPasswordVerificationTokenByToken(token);

  if (!existingToken) {
    return {
      success: '',
      error: "The password can't be changed"
    };
  }

  const user = await db.user.findUnique({
    where: {
      id: existingToken.userId
    }
  });

  if (!user) {
    return {
      success: '',
      error: "The password can't be changed"
    };
  }

  const { password } = validData.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: { id: user.id },
    data: { password: hashedPassword }
  });

  await db.passwordVerificationToken.delete({
    where: { id: existingToken.id }
  });

  return {
    success: 'Password changed!',
    error: ''
  };
};
