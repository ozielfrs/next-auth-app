import { db } from '@/lib/db';

export const getEmailVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await db.emailVerificationToken.findUnique({
      where: {
        token
      }
    });
    return verificationToken;
  } catch (e) {
    return null;
  }
};

export const getEmailVerificationTokenByUserId = async (userId: string) => {
  try {
    const verificationToken = await db.emailVerificationToken.findUnique({
      where: {
        userId
      }
    });
    return verificationToken;
  } catch (e) {
    return null;
  }
};

export const getPasswordVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await db.passwordVerificationToken.findUnique({
      where: {
        token
      }
    });
    return verificationToken;
  } catch (e) {
    return null;
  }
};

export const getPasswordVerificationTokenByUserId = async (userId: string) => {
  try {
    const verificationToken = await db.passwordVerificationToken.findUnique({
      where: {
        userId
      }
    });
    return verificationToken;
  } catch (e) {
    return null;
  }
};
