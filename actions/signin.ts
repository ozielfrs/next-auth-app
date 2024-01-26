"use server";

import { SignInSchema } from "@/schemas";
import { z } from "zod";

export const SignIn = async (values: z.infer<typeof SignInSchema>) => {
	const validatedFields = SignInSchema.safeParse(values);

	if (!validatedFields.success) {
		return {error: "Invalid fields"};
	}

	return {success: "Valid fields"};
};
