"use server";

import { signIn } from "@/auth";
import { DEFAULT_LANDING_PAGE_URL } from "@/routes";
import { SignInSchema } from "@/schemas";
import { AuthError } from "next-auth";
import { z } from "zod";

export const SignIn = async (values: z.infer<typeof SignInSchema>) => {
  const validatedFields = SignInSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password } = validatedFields.data;

  await signIn("credentials", {
    email,
    password,
    redirectTo: DEFAULT_LANDING_PAGE_URL,
  }).catch((error) => {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Unknown error" };
      }
    }
    throw error;
  });
};
