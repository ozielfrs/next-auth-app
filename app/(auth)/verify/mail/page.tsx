'use client';

import { SendEmailVerificationLink } from '@/actions/auth/mail/verification';
import { Header } from '@/components/auth/header';
import { BackButton } from '@/components/auth/signin/back/button';
import { CardWrapper } from '@/components/card/wrapper';
import {
  FormError,
  FormSuccess,
  FormVerification
} from '@/components/form/states';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

const EmailVerificationPage = () => {
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const searchParams = useSearchParams();

  const token = searchParams.get('token');

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError('Invalid token');
      return;
    }
    SendEmailVerificationLink(token)
      .then(res => {
        if (res) {
          setError(res.error);
          setSuccess(res.success);
        }
      })
      .catch(() => {
        setError('Something went wrong!');
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      header={<Header title="Verify your email" />}
      footer={
        <>
          <BackButton href={'/signin'} label={'Sign in now'} />
        </>
      }
    >
      {!error && !success && <FormVerification />}
      <FormError message={error} />
      <FormSuccess message={success} />
    </CardWrapper>
  );
};

export default EmailVerificationPage;
