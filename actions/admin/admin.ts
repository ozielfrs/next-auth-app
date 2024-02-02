'use server';

import { currentrole } from '@/lib/auth';
import { UserRole } from '@prisma/client';

export const admin = async () => {
  const role = await currentrole();

  return role === UserRole.ADMIN ? { ok: true } : { ok: false };
};
