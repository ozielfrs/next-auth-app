'use client';

import { PasswordResetForm } from '@/components/auth/reset/key/form';
import { useSearchParams } from 'next/navigation';

const PasswordVerificationPage = () => {
  const searchParams = useSearchParams();

  const token = searchParams.get('token') || '';

  return <PasswordResetForm token={token} />;
};

export default PasswordVerificationPage;
