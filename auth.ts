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
import { getAccountByUserId } from './data/account';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  unstable_update
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
    async session({ session, token }: { session: Session; token?: JWT }) {
      if (session.user) {
        if (token?.sub) {
          session.user.id = token.sub;
          if (token?.name) session.user.name = token.name as string;
          if (token?.role) session.user.role = token.role as UserRole;
          if (token?.enabled2FA)
            session.user.enabled2FA = token.enabled2FA as boolean;
          if (token?.email) session.user.email = token.email as string;
          if (token?.isOAuth) session.user.isOAuth = token.isOAuth as boolean;
        }
      }

      return session;
    },
    async jwt({ token }) {
      if (token?.sub) {
        const user = await getUserById(token.sub);
        if (!user) {
          return token;
        }
        const account = await getAccountByUserId(user.id);
        token.name = user.name;
        token.email = user.email;
        token.enabled2FA = user.enabled2FA;
        token.role = user.role;
        token.isOAuth = account ? true : false;
      }

      return token;
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig
});
