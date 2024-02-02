import { admin } from '@/actions/admin/admin';
import { Header } from '@/components/auth/header';
import { CardWrapper } from '@/components/card/wrapper';
import { FormSuccess } from '@/components/form/states';
import { Button } from '@/components/ui/button';
import { UserRole } from '@prisma/client';
import { toast } from 'sonner';
import { RoleGate } from './role';

export const AdminRole = () => {
  const onServerActionClick = async () => {
    admin().then(res =>
      res.ok
        ? toast.success('API Route Success!')
        : toast.error('API Route Failed!')
    );
  };

  const onAPIRouteClick = async () => {
    fetch('/api/admin').then(res =>
      res.ok
        ? toast.success('API Route Success!')
        : toast.error('API Route Failed!')
    );
  };

  return (
    <CardWrapper header={<Header title="Admin" />}>
      <div className="w-[600px] space-y-4">
        <RoleGate role={UserRole.ADMIN}>
          <FormSuccess message="Welcome, admin!" />
        </RoleGate>
        <div className="flex items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Admin-Only API Route</p>
          <Button onClick={onAPIRouteClick}>Click to test!</Button>
        </div>
        <div className="flex items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Admin-Only Server Action</p>
          <Button onClick={onServerActionClick}>Click to test!</Button>
        </div>
      </div>
    </CardWrapper>
  );
};
