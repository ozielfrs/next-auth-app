'use server';

import { db } from '@/lib/db';
import { sendVerificationEmail } from '@/lib/mail';
import { generateVerificationTokenByUserId } from '@/lib/tokens';
import { SignUpSchema } from '@/schemas';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

export const SignUp = async (values: z.infer<typeof SignUpSchema>) => {
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
    const verificationToken = await generateVerificationTokenByUserId(user.id);
    if (user.email)
      await sendVerificationEmail(user.email, verificationToken.token);
    return { success: 'Verification email sent', error: '' };
  } else {
    return { success: '', error: 'This email is not available' };
  }
};
