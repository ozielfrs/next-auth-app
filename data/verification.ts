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

export const get2FAVerificationTokenByUserId = async (userId: string) => {
  try {
    const verificationToken = await db.twoFactorVerificationToken.findUnique({
      where: {
        userId
      }
    });
    return verificationToken;
  } catch (e) {
    return null;
  }
};

export const delete2FAVerificationTokenByUserId = async (userId: string) => {
  try {
    await db.twoFactorVerificationToken.delete({
      where: {
        userId
      }
    });
    return true;
  } catch (e) {
    return false;
  }
};

export const delete2FAVerificationTokenByTokenId = async (id: string) => {
  try {
    await db.twoFactorVerificationToken.delete({
      where: {
        id
      }
    });
    return true;
  } catch (e) {
    return false;
  }
};

export const update2FAVerificationTokenStatusByUserId = async (
  userId: string
) => {
  try {
    const verificationToken = await db.twoFactorVerificationToken.update({
      where: {
        userId
      },
      data: {
        status: true
      }
    });
    return verificationToken;
  } catch (e) {
    return null;
  }
};

export const update2FAVerificationTokenStatusByTokenId = async (id: string) => {
  try {
    const verificationToken = await db.twoFactorVerificationToken.update({
      where: {
        id
      },
      data: {
        status: true
      }
    });
    return verificationToken;
  } catch (e) {
    return null;
  }
};
