import * as z from "zod";
import type { createTimeBasedSchema } from "./schema";

export type CreateTimeBasedSchema = z.infer<typeof createTimeBasedSchema>;
