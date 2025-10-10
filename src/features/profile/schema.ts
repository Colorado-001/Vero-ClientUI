import * as z from "zod";

const usernameSchema = z
  .string()
  .min(3, "Username must be at least 3 characters")
  .max(20, "Username must not exceed 20 characters")
  .regex(
    /^[a-zA-Z0-9_]+$/,
    "Username can only contain letters, numbers, and underscores"
  )
  .regex(
    /^(?!_)(?!.*__)(?!.*_$)/,
    "Username cannot start or end with an underscore or contain consecutive underscores"
  );

export const setupUsernameSchema = z.object({
  username: usernameSchema,
  action: z.literal("setupUsername"),
});
export type TSetupUsernameSchema = z.infer<typeof setupUsernameSchema>;

export const setupPinSchema = z.object({
  pin: z.string().min(6),
  action: z.literal("setupPin"),
});
export type TSetupPinSchema = z.infer<typeof setupPinSchema>;

export const updateProfileSchema = z.discriminatedUnion("action", [
  setupUsernameSchema,
  setupPinSchema,
]);
export type TUpdateProfileSchema = z.infer<typeof updateProfileSchema>;

export type ProfileAction = TUpdateProfileSchema["action"];

export type ActionFormMap = {
  setupUsername: TSetupUsernameSchema;
  setupPin: TSetupPinSchema;
};
