import type { UserDto } from "../../types/models";
import { axiosInstance } from "../client";
import endpoints from "../endpoints";

export const setup_pin = async (pin: string) => {
  return (await axiosInstance.post<UserDto>(endpoints.pinSetup(), { pin }))
    .data;
};
