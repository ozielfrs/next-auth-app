'use client';

import { CardWrapper } from '@/components/card/wrapper';
import { Header } from '@/components/auth/header';
import { BackButton } from '@/components/auth/signin/back/button';

import { useState, useTransition } from 'react';
import { useSearchParams } from 'next/navigation';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { z } from 'zod';
import { SignInSchema } from '@/schemas';
import { Input } from '@/components/ui/input';

import { Button } from '@/components/ui/button';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';

import { FormSuccess, FormError } from '@/components/form/states';
import { SignIn } from '@/actions/signin';

export const SignInForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const searchParams = useSearchParams();
  const errorParam =
    searchParams.get('error') === 'OAuthAccountNotLinked'
      ? 'Please sign in with the provider you used previously!'
      : '';

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = (data: z.infer<typeof SignInSchema>) => {
    startTransition(() => {
      SignIn(data).then(res => {
        if (res) {
          setError(res.error);
          setSuccess(res.success);
        }
      });
    });
  };

  return (
    <>
      <CardWrapper
        header={<Header />}
        description={<>Sign in to your account to continue</>}
        footer={
          <>
            <BackButton href={'signup'} label={"Don't have an account?"} />
          </>
        }
        showSocials
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-3">
              <FormField
                disabled={isPending}
                control={form.control}
                name={'email'}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={'example@mail.com'}
                        type={'email'}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                disabled={isPending}
                control={form.control}
                name={'password'}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={'********'}
                        type={'password'}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormSuccess message={success} />
              <FormError message={error || errorParam} />
              <Button className={'w-full bg-gradient-500'} type={'submit'}>
                Sign in
              </Button>
            </div>
          </form>
        </Form>
      </CardWrapper>
    </>
  );
};
