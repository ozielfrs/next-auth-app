'use client';

import { SocialLinks } from '@/components/auth/social';
import { GithubProvider, GoogleProvider } from '@/components/auth/providers';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader
} from '@/components/ui/card';

interface CardWrapperProps {
  description?: React.ReactNode;
  children?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  showSocials?: boolean;
}

export const CardWrapper = ({
  description,
  children,
  header,
  footer,
  showSocials
}: CardWrapperProps) => {
  return (
    <>
      <Card className={'flex flex-col items-center overflow-auto m-2'}>
        {header && <CardHeader>{header}</CardHeader>}
        {description && (
          <CardContent>
            <CardDescription>{description}</CardDescription>
          </CardContent>
        )}
        {children && <CardContent>{children}</CardContent>}
        {showSocials && (
          <>
            <SocialLinks
              text={GoogleProvider.text}
              providerIcon={GoogleProvider.providerIcon}
              provider={GoogleProvider.provider}
            />
            <SocialLinks
              text={GithubProvider.text}
              providerIcon={GithubProvider.providerIcon}
              provider={GithubProvider.provider}
            />
          </>
        )}
        {footer && <CardFooter>{footer}</CardFooter>}
      </Card>
    </>
  );
};
