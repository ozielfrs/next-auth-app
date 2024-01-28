'use client';

import { Poppins } from 'next/font/google';

import { cn } from '@/lib/utils';

const font = Poppins({
  subsets: ['latin-ext'],
  weight: ['600']
});

interface HeaderProps {
  label?: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <>
      <h1 className={cn('text-3xl text-gradient-500', font.className)}>
        Auth App
      </h1>
      {label && (
        <p className="text-center text-muted-foreground text-sm">{label}</p>
      )}
    </>
  );
};
