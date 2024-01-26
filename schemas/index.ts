import { z } from "zod";

export const SignInSchema = z.object({
	email: z.string().email({ message: "Email required" }),
	password: z.string().min(6, { message: "Password required" }),
});

export const SignUpSchema = z.object({
	email: z.string().email({ message: "Email required" }),
	password: z.string().min(6, { message: "The password must be at least 6 characters long" }),
	name: z.string().min(2, { message: "Name required" }),
});
