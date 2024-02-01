import { useSession } from 'next-auth/react';

export const useHookedUser = () => {
  const { data } = useSession();
  return data?.user;
};
