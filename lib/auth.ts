import { auth } from '@/auth';

export const currentuser = async () => {
  const session = await auth();
  return session?.user;
};

export const currentrole = async () => {
  const session = await auth();
  return session?.user?.role;
};
