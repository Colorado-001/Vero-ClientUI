import type { IUpdateProfileRequest } from "../../types/common";
import type { UserDto } from "../../types/models";
import { axiosInstance } from "../client";
import endpoints from "../endpoints";

export const update_profile = async (data: IUpdateProfileRequest) => {
  return (await axiosInstance.patch<UserDto>(endpoints.me(), data)).data;
};
