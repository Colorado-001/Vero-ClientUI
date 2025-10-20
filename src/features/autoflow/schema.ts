import * as z from "zod";
import { AUTOFLOW_FREQUENCY } from "./constants";

export const createTimeBasedSchema = z.object({
  frequency: z.enum(AUTOFLOW_FREQUENCY),
  dayOfMonth: z.coerce.number().min(1).max(31),
  amountToSave: z.coerce.number().positive(),
  tokenToSave: z.string(),
  name: z.string(),
});
