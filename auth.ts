import authConfig from '@/auth.config';
import { getUserById } from '@/data/user';
import {
  delete2FAVerificationTokenByTokenId,
  get2FAVerificationTokenByUserId
} from '@/data/verification';
import { db } from '@/lib/db';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { UserRole } from '@prisma/client';
import type { Session, User } from 'next-auth';
import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  pages: {
    signIn: '/signin',
    error: '/error'
  },
  events: {
    async linkAccount({ user }: { user: User }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() }
      });
    }
  },
  callbacks: {
    async signIn({ user, account }) {
      if (!account || !user) return false;

      if (account.provider !== 'credentials') return true;

      if (user.id) {
        const existingUser = await getUserById(user.id);

        if (!existingUser) return false;

        if (!existingUser.emailVerified) return false;

        if (existingUser.enabled2FA) {
          const twoFactorConfirmation = await get2FAVerificationTokenByUserId(
            existingUser.id
          );

          if (!twoFactorConfirmation) return false;
          if (twoFactorConfirmation.status)
            await delete2FAVerificationTokenByTokenId(twoFactorConfirmation.id);
          else return false;
        }
      }

      return true;
    },
    async session({
      session,
      token,
      user
    }: {
      session: Session;
      token?: JWT;
      user?: User;
    }) {
      if (session.user) {
        if (token?.sub) {
          if (token?.role) session.user.role = token.role as UserRole;
        }
      }

      return session;
    },
    async jwt({ token }) {
      if (token?.sub) {
        const user = await getUserById(token.sub);
        if (user) {
          token.role = user.role;
        }
      }
      return token;
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig
});
