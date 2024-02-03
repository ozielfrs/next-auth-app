'use client';

import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { SignInForm } from '@/components/auth/signin/form';
import { SignUpForm } from '@/components/auth/signup/form';

interface SignButtonProps {
  children: React.ReactNode;
  href?: string;
  mode?: 'modal' | 'page';
  asChild?: boolean;
}

export const SignButton = ({
  children,
  href = '',
  mode = 'page',
  asChild
}: SignButtonProps) => {
  const router = useRouter();

  const clickHandler = () => {
    router.push(href);
  };

  if (mode === 'modal') {
    return (
      <Dialog>
        <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
        <DialogContent className="p-0 w-auto bg-transparent border-none">
          {href === '/signin' && <SignInForm />}
          {href === '/signup' && <SignUpForm />}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <span onClick={clickHandler} className={'cursor-pointer'}>
      {children}
    </span>
  );
};
