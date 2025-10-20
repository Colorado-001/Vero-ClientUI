import * as z from "zod";
import { walletAddressSchema } from "../send/schemas";

export const createDelegationSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("allowance"),
    name: z.string(),
    walletAddress: walletAddressSchema,
    frequency: z.enum(["Daily"]),
    startDate: z.coerce.date(),
    amountLimit: z.coerce.number(),
  }),
  z.object({
    type: z.literal("group_wallet"),
    name: z.string(),
    members: z.array(
      z.object({ name: z.string(), address: walletAddressSchema })
    ),
    approvalThreshold: z.number(),
    amountLimit: z.coerce.number(),
  }),
]);
