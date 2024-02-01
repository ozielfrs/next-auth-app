'use server';

import { signOut } from '@/auth';

export const UserSignOut = async () => {
  await signOut();
};
