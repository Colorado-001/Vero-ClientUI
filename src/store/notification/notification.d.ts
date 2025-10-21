import type { NotificationDto } from "../../types/models";

export type NotificationState = {
  notifications: NotificationDto[];
  loading: boolean;
};

export type NotificationAction = {
  loadNotifications: (refresh: boolean) => Promise<void>;
};
