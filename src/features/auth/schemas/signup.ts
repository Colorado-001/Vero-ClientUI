import * as z from "zod";

export const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Please enter your email" })
    .email({ message: "Invalid email address" }),
});

export type TLoginForm = z.infer<typeof loginFormSchema>;
