'use client';

import { SignButton } from '@/components/auth/signin/button';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Poppins } from 'next/font/google';

const font = Poppins({
  subsets: ['latin-ext'],
  weight: ['600']
});

const AppPage = () => {
  return (
    <main className={'main-bg-500'}>
      <div className={'space-y-6 text-white text-center'}>
        <h1
          className={cn(
            'text-6xl font-semibold drop-shadow-xl text-gradient-100',
            font.className
          )}
        >
          Auth App
        </h1>
        <p className={'text-lg'}>
          A simple app to demonstrate authentication with NextAuth.js
        </p>
        <div className={'space-x-5'}>
          <SignButton href={'/signin'} mode="modal" asChild>
            <Button variant={'secondary'}>Sign In</Button>
          </SignButton>
          <SignButton href={'/signup'} mode="modal" asChild>
            <Button variant={'secondary'}>Sign Up</Button>
          </SignButton>
        </div>
      </div>
    </main>
  );
};

export default AppPage;
