import authConfig from '@/auth.config';
import { getUserById } from '@/data/user';
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
      if (account?.provider === 'credentials') return true;

      if (user?.id) {
        const existingUser = await getUserById(user.id);

        if (!existingUser?.emailVerified) return false;
      }

      return false;
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
