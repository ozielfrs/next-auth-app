'use client';

import { CreateUser } from '@/actions/auth/signup';
import { Header } from '@/components/auth/header';
import { BackButton } from '@/components/auth/signin/back/button';
import { CardWrapper } from '@/components/card/wrapper';
import { FormError, FormSuccess } from '@/components/form/states';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SignUpSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const SignUpForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: '',
      password: '',
      name: ''
    }
  });

  const onSubmit = (data: z.infer<typeof SignUpSchema>) => {
    setSuccess('');
    setError('');

    startTransition(() => {
      CreateUser(data).then(res => {
        if (res) {
          if (res.error) setError(res.error);
          if (res.success) setSuccess(res.success);
        }
      });
    });
  };

  return (
    <CardWrapper
      header={<Header title="Sign Up" />}
      footer={
        <BackButton href={'/signin'} label={'Already have an account?'} />
      }
      showSocials
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-3">
            <FormField
              control={form.control}
              name={'name'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder={'Your Name'}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={'email'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder={'example@mail.com'}
                      type={'email'}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={'password'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder={'********'}
                      type={'password'}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormSuccess message={success} />
            <FormError message={error} />
            <Button
              disabled={isPending}
              className={'w-full bg-gradient-500'}
              type={'submit'}
            >
              Confirm
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};
