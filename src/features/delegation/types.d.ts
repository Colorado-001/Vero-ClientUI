import * as z from "zod";
import type { DELEGATION_TYPES } from "./constants";
import type { createDelegationSchema } from "./schemas";

export type DelegationType = (typeof DELEGATION_TYPES)[number];

export type CreateDelegationSchema = z.infer<typeof createDelegationSchema>;
