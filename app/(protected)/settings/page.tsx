'use client';

import { useHookedUser } from '@/hooks/auth/user';
import { UserSignOut } from '@/actions/auth/signout';

const SettingsPage = () => {
  const user = useHookedUser();
  const onClick = () => {
    UserSignOut();
  };

  return (
    <div>
      {JSON.stringify(user)}
      <button onClick={onClick}>Sign Out</button>
    </div>
  );
};

export default SettingsPage;
