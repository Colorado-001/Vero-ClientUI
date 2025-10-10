import type { UserDto } from "../../types/models";
import { axiosInstance } from "../client";
import endpoints from "../endpoints";

export const get_profile = async () => {
  return (await axiosInstance.get<UserDto>(endpoints.me())).data;
};
