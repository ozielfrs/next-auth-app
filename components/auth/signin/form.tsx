"use client";

import { CardWrapper } from "@/components/card/wrapper";
import { Header } from "@/components/auth/header";
import { BackButton } from "@/components/auth/signin/back/button";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { SignInSchema } from "@/schemas";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { FormError } from "@/components/form/error";
import { FormSuccess } from "@/components/form/success";
import { signin } from "@/actions/signin";

export const SignInForm = () => {
  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof SignInSchema>) => {
    console.log(data);
  };

  return (
    <>
      <CardWrapper
        header={<Header />}
        description={<>Sign in to your account to continue</>}
        footer={
          <>
            <BackButton href="register" label="Not registered yet?" />
          </>
        }
        showSocials
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-3">
              <FormField
                control={form.control}
                name={"email"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={"example@mail.com"}
                        type={"email"}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={"password"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={"********"}
                        type={"password"}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormSuccess message={""} />
              <FormError message={""} />
              <Button
                className={
                  form.formState.isValid
                    ? "w-full bg-gradient-500"
                    : "w-full bg-gradient-300"
                }
                type={"submit"}
              >
                Sign in
              </Button>
            </div>
          </form>
        </Form>
      </CardWrapper>
    </>
  );
};
