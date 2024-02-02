'use client';

import { UserButton } from '@/components/auth/user/button';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Navbar = () => {
  const pathName = usePathname();

  return (
    <nav className="flex justify-between items-center p-4 rounded-xl w-[600px] shadow-sm bg-white text-black">
      <div className="flex gap-x-2">
        <Button variant={pathName === '/home' ? 'default' : 'outline'} asChild>
          <Link href={'/home'}>Home</Link>
        </Button>
        <Button
          variant={pathName === '/server' ? 'default' : 'outline'}
          asChild
        >
          <Link href={'/server'}>Server</Link>
        </Button>
        <Button
          variant={pathName === '/client' ? 'default' : 'outline'}
          asChild
        >
          <Link href={'/client'}>Client</Link>
        </Button>
        <Button variant={pathName === '/admin' ? 'default' : 'outline'} asChild>
          <Link href={'/admin'}>Admin</Link>
        </Button>
        <Button
          variant={pathName === '/settings' ? 'default' : 'outline'}
          asChild
        >
          <Link href={'/settings'}>Settings</Link>
        </Button>
      </div>
      <UserButton />
    </nav>
  );
};
