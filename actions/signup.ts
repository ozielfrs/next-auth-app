"use server";

import { SignUpSchema } from "@/schemas";
import { z } from "zod";
import bcryptjs from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";

export const SignUp = async (values: z.infer<typeof SignUpSchema>) => {
	const validatedFields = SignUpSchema.safeParse(values);

	if (!validatedFields.success) {
		return {error: "Invalid fields"};
	}

	const {name, email, password} = validatedFields.data;

	const existingUser = await db.user.findUnique({
		where: {
			email,
		},
	});

	if (existingUser) {
		return {error: "User already exists"};
	}

	const hashedPassword = await bcryptjs.hash(password, 10);

	await getUserByEmail(email);

	// TODO: Validate Email

	return {success: "User created"};
};
