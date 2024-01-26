import { z } from "zod";

export const SignInSchema = z.object({
	email: z.string().email({ message: "Email required" }),
	password: z.string().min(1, { message: "Password required" }),
});
