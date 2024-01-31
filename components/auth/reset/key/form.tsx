'use client';

import { ResetPassword } from '@/actions/auth/key/reset';
import { Header } from '@/components/auth/header';
import { BackButton } from '@/components/auth/signin/back/button';
import { CardWrapper } from '@/components/card/wrapper';
import { FormError, FormSuccess } from '@/components/form/states';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { NewPasswordSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const PasswordResetForm = ({ token }: { token: string }) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: ''
    }
  });

  const onSubmit = (data: z.infer<typeof NewPasswordSchema>) => {
    setSuccess('');
    setError('');

    startTransition(() => {
      ResetPassword(data, token).then(res => {
        if (res) {
          if (res.error) setError(res.error);
          if (res.success) setSuccess(res.success);
        }
      });
    });
  };

  return (
    <CardWrapper
      header={<Header label="Reset your password" />}
      footer={<BackButton href={'/'} label={'Go back'} />}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-3">
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
            <FormError message={error} />
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};
