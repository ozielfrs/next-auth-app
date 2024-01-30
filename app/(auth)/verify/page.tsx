'use client';

import { newVerification } from '@/actions/verification';
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

const VerificationPage = () => {
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
    newVerification(token)
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
          <BackButton href={'/home'} label={'Go to home page'} />
        </>
      }
    >
      {!error && !success && <FormVerification />}
      <FormError message={error} />
      <FormSuccess message={success} />
    </CardWrapper>
  );
};

export default VerificationPage;
