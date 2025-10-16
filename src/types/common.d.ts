import type { AppIcons } from "../assets/svg";

export interface IUpdateProfileRequest {
  username?: string;
}

export type AppIconType = keyof typeof AppIcons;
