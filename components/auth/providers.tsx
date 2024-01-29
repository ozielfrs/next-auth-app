import { SocialLinkProps } from '@/components/auth/social';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

export const GoogleProvider: SocialLinkProps = {
  text: 'Continue with Google',
  providerIcon: <FcGoogle />,
  provider: 'google'
};

export const GithubProvider: SocialLinkProps = {
  text: 'Continue with Github',
  providerIcon: <FaGithub />,
  provider: 'github'
};
