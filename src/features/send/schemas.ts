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
