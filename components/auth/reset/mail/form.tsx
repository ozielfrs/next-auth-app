'use client';

import { SendEmailResetPasswordLink } from '@/actions/auth/mail/verification';
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
import { PasswordResetSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const EmailPasswordResetLinkForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const form = useForm<z.infer<typeof PasswordResetSchema>>({
    resolver: zodResolver(PasswordResetSchema),
    defaultValues: {
      email: ''
    }
  });

  const onSubmit = (data: z.infer<typeof PasswordResetSchema>) => {
    setSuccess('');
    setError('');

    startTransition(() => {
      SendEmailResetPasswordLink(data).then(res => {
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

            <FormSuccess message={success} />
            <FormError message={error} />
            <Button className={'w-full bg-gradient-500'} type={'submit'}>
              Send reset email
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};
