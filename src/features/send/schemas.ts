import * as z from "zod";

export const walletAddressSchema = z
  .string()
  .trim()
  .regex(/^0x[a-fA-F0-9]{40}$/, "Invalid wallet address")
  .describe("Ethereum-compatible wallet address");

export const selectWalletAddressSchema = z.object({
  address: walletAddressSchema,
});
export type SelectWalletAddressSchema = z.infer<
  typeof selectWalletAddressSchema
>;

export const enterAmountSchema = z.object({
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine((val) => {
      const num = Number(val);
      return !isNaN(num) && num > 0;
    }, "Amount must be greater than 0"),
  delegation: z.string().optional(),
});
export type EnterAmountSchema = z.infer<typeof enterAmountSchema>;
