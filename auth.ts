import NextAuth, { type Session, type User } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';

import { UserRole } from '@prisma/client';
import { getUserById } from '@/data/user';
import { db } from '@/lib/db';
import authConfig from '@/auth.config';

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
    async session({
      session,
      user,
      token
    }: {
      session: Session;
      user?: User;
      token?: any;
    }) {
      if (session.user) {
        if (token?.sub) {
          session.user.role = token.role as UserRole;
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
