import Credentials from "next-auth/providers/credentials";

import type { NextAuthConfig } from "next-auth";

import { SignInSchema } from "@/schemas";
import { getUserByEmail } from "./data/user";

import bcryptjs from "bcryptjs";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = SignInSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);

          if (!user || !user.password) return null;

          const passwordCheck = await bcryptjs.compare(password, user.password);

          if (passwordCheck) return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
