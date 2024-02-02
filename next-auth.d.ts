import { UserRole } from '@prisma/client';
import { DefaultSession } from 'next-auth';

export type ExtendedUser = DefaultSession['user'] & {
  role?: UserRole;
  enabled2FA?: boolean;
};

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser;
  }
}
