'use client';

import { SignOutButton } from '@/components/auth/signout/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useHookedUser } from '@/hooks/auth/user';
import { ExitIcon } from '@radix-ui/react-icons';
import { FaUser } from 'react-icons/fa';

export const UserButton = () => {
  const user = useHookedUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ''} />
          <AvatarFallback className="bg-slate-950">
            <FaUser className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <SignOutButton>
          <DropdownMenuItem className="align-end text-destructive space-x-2">
            <ExitIcon /> <p>Sign Out</p>
          </DropdownMenuItem>
        </SignOutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
