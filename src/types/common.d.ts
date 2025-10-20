import type { AppIcons } from "../assets/svg";
import type { AUTOFLOW_FREQUENCY } from "../features/autoflow/constants";

export interface IUpdateProfileRequest {
  username?: string;
}

export type AppIconType = keyof typeof AppIcons;

export type AutoflowFrequency = (typeof AUTOFLOW_FREQUENCY)[number];
