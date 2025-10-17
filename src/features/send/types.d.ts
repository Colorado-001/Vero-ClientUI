import type { SEND_STEPS } from "./constants";

export type SendStep = (typeof SEND_STEPS)[number];
