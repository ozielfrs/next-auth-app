'use client';

import { cn } from '@/lib/utils';
import { Poppins } from 'next/font/google';

const font = Poppins({
  subsets: ['latin-ext'],
  weight: ['600']
});

interface HeaderProps {
  title?: string;
  label?: string;
}

export const Header = ({ label, title = 'Auth App' }: HeaderProps) => {
  return (
    <div className="flex flex-col items-center">
      <h1 className={cn('text-2xl text-gradient-500', font.className)}>
        {title}
      </h1>
      {label && <div className="text-gradient-300 text-sm">{label}</div>}
    </div>
  );
};
