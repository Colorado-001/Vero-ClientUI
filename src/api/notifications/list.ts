import type { NotificationDto } from "../../types/models";
import { axiosInstance } from "../client";
import endpoints from "../endpoints";

export const list = async (page = 1, size = 20) => {
  return (
    await axiosInstance.get<NotificationDto[]>(endpoints.notifications, {
      params: {
        page,
        size,
      },
    })
  ).data;
};
