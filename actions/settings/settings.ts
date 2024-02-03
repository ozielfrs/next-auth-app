'use server';

import { unstable_update } from '@/auth';
import { getUserByEmail, getUserById } from '@/data/user';
import { currentuser } from '@/lib/auth';
import { db } from '@/lib/db';
import { sendEmailVerificationEmail } from '@/lib/mail';
import { generateEmailVerificationTokenByUserId } from '@/lib/tokens';
import { SettingsSchema } from '@/schemas';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

export const UpdateUser = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentuser();

  if (!user || !user.id) return { error: 'User not found' };

  const dbUser = await getUserById(user.id);

  if (!dbUser) return { error: 'User not found' };

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.enabled2FA = undefined;
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);

    if (existingUser) return { error: 'Email already in use' };
    const verificationToken = await generateEmailVerificationTokenByUserId(
      user.id
    );

    await sendEmailVerificationEmail(values.email, verificationToken.token);
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordMatch = await bcrypt.compare(
      values.password,
      dbUser.password
    );

    if (!passwordMatch) return { error: 'Invalid password' };

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);

    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  const updatedValues = await db.user.update({
    where: { id: user.id },
    data: {
      ...values
    }
  });

  unstable_update({
    user: {
      name: updatedValues.name,
      email: updatedValues.email,
      role: updatedValues.role,
      enabled2FA: updatedValues.enabled2FA
    }
  });

  return { success: 'Settings updated' };
};
