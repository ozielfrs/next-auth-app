'use client';

import { UpdateUser } from '@/actions/settings/settings';
import { Header } from '@/components/auth/header';
import { CardWrapper } from '@/components/card/wrapper';
import { FormError, FormSuccess } from '@/components/form/states';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useHookedUser } from '@/hooks/auth/user';
import { SettingsSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserRole } from '@prisma/client';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export const SettingsForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const user = useHookedUser();

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: user?.name || undefined,
      email: user?.email || undefined,
      password: undefined,
      newPassword: undefined,
      role: user?.role || undefined,
      enabled2FA: user?.enabled2FA || undefined
    }
  });

  const onSubmit = (data: z.infer<typeof SettingsSchema>) => {
    setSuccess('');
    setError('');

    startTransition(() => {
      UpdateUser(data).then(res => {
        if (res) {
          if (res.error) toast.error(res.error);
          if (res.success) {
            toast.success(res.success);
          }
        }
      });
    });
  };

  return (
    <CardWrapper header={<Header title="Settings Page" />}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-3 w-[600px]">
            <FormField
              control={form.control}
              name={'name'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Change your name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder={`${user?.name}`}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {!user?.isOAuth && (
              <>
                <FormField
                  control={form.control}
                  name={'email'}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Change your email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder={`${user?.email}`}
                          type="email"
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
                          placeholder={`********`}
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={'newPassword'}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What will be your new password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder={`********`}
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            <FormField
              control={form.control}
              name={'role'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    disabled={isPending}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role"></SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={UserRole.USER}>User</SelectItem>
                      <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            {!user?.isOAuth && (
              <FormField
                control={form.control}
                name={'enabled2FA'}
                render={({ field }) => (
                  <FormItem className="flex flex-row justify-between items-center">
                    <div className="space-y-1">
                      <FormLabel>Enable 2FA</FormLabel>
                      <FormDescription>
                        Enable two factor authentication for your account
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        disabled={isPending}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}

            <FormSuccess message={success} />
            <FormError message={error} />
            <Button
              disabled={isPending}
              className={'bg-gradient-500'}
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
