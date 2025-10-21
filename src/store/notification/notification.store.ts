import { create } from "zustand";
import * as notificationApi from "../../api/notifications";
import type { NotificationAction, NotificationState } from "./notification";

export const useNotificationStore = create<
  NotificationState & NotificationAction
>()((set, get) => ({
  notifications: [],
  loading: false,

  async loadNotifications(refresh = false) {
    const { notifications } = get();
    if (notifications.length > 0 && !refresh) {
      return;
    }

    try {
      set({ loading: true });
      const result = await notificationApi.list();
      set({ notifications: result });
    } finally {
      set({ loading: false });
    }
  },
}));
