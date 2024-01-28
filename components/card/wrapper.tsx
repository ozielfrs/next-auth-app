'use client';

import { SocialLinks, SocialLinkProps } from '@/components/auth/social';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader
} from '@/components/ui/card';
import { apiRoutes } from '@/routes';

interface CardWrapperProps {
  description?: React.ReactNode;
  children?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  showSocials?: boolean;
}

export const CardWrapper = ({
  description,
  children: content,
  header,
  footer,
  showSocials
}: CardWrapperProps) => {
  const GoogleProvider: SocialLinkProps = {
    text: 'Continue with Google',
    providerIcon: <FcGoogle />,
    authRoute: '/api/auth/google'
  };

  const GithubProvider: SocialLinkProps = {
    text: 'Continue with Github',
    providerIcon: <FaGithub />,
    authRoute: '/api/auth/github'
  };

  return (
    <>
      <Card className={'flex flex-col items-center overflow-auto m-2'}>
        {header && <CardHeader>{header}</CardHeader>}
        {description && (
          <CardContent>
            <CardDescription>{description}</CardDescription>
          </CardContent>
        )}
        {content && <CardContent>{content}</CardContent>}
        {showSocials && (
          <>
            <SocialLinks
              text={GoogleProvider.text}
              providerIcon={GoogleProvider.providerIcon}
              authRoute={GoogleProvider.authRoute}
            />
            <SocialLinks
              text={GithubProvider.text}
              providerIcon={GithubProvider.providerIcon}
              authRoute={GithubProvider.authRoute}
            />
          </>
        )}
        {footer && <CardFooter>{footer}</CardFooter>}
      </Card>
    </>
  );
};
