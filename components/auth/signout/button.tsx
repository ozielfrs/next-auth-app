'use client';

import { UserSignOut } from '@/actions/auth/signout';

interface SingOutButtonPros {
  children?: React.ReactNode;
}

export const SignOutButton = ({ children }: SingOutButtonPros) => {
  const onClick = () => {
    UserSignOut();
  };

  return <span onClick={onClick}>{children}</span>;
};
