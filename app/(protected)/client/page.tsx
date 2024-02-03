'use client';

import { UserInfo } from '@/components/auth/user/info';
import { useHookedUser } from '@/hooks/auth/user';

const ClientPage = () => {
  const user = useHookedUser();

  return <UserInfo label="Client Component" user={user} />;
};

export default ClientPage;
