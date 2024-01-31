'use server';

import { db } from '@/lib/db';
import { sendEmailVerificationEmail } from '@/lib/mail';
import { generateEmailVerificationTokenByUserId } from '@/lib/tokens';
import { SignUpSchema } from '@/schemas';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

export const CreateUser = async (values: z.infer<typeof SignUpSchema>) => {
  const validatedFields = SignUpSchema.safeParse(values);

  if (!validatedFields.success) {
    return { success: '', error: 'Invalid fields' };
  }

  const { name, email, password } = validatedFields.data;

  const existingUser = await db.user.findUnique({
    where: {
      email
    }
  });

  if (existingUser) {
    return { success: '', error: 'User already exists' };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword
    }
  });

  if (user) {
    const verificationToken = await generateEmailVerificationTokenByUserId(
      user.id
    );

    await sendEmailVerificationEmail(email, verificationToken.token);

    return { success: 'Verification email sent', error: '' };
  }

  return { success: '', error: 'This email is not available' };
};
