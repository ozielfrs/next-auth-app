"use server";

import { SignUpSchema } from "@/schemas";
import { z } from "zod";

export const SignUp = async (values: z.infer<typeof SignUpSchema>) => {
	const validatedFields = SignUpSchema.safeParse(values);

	if (!validatedFields.success) {
		return {error: "Invalid fields"};
	}

	return {success: "Valid fields"};
};
