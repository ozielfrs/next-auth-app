'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
export interface SocialLinkProps {
  text?: string;
  providerIcon?: React.ReactNode;
  authRoute: string;
}

export const SocialLinks = ({
  text,
  providerIcon,
  authRoute
}: SocialLinkProps) => {
  return (
    <>
      <Button className={'bg-gradient-900 space-x-2 mb-2'} size={'default'}>
        {providerIcon}
        <Link href={authRoute}>{text}</Link>
      </Button>
    </>
  );
};
