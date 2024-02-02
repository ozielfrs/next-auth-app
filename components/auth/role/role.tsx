'use client';

import { FormError } from '@/components/form/states';
import { useHookedUserRole } from '@/hooks/auth/user';
import { UserRole } from '@prisma/client';

interface RoleGateProps {
  role: UserRole;
  children: React.ReactNode;
}

export const RoleGate = ({ role, children }: RoleGateProps) => {
  const userRole = useHookedUserRole();
  if (userRole !== role) {
    return <FormError message="You don't have permission for see this!" />;
  }
  return <>{children}</>;
};
