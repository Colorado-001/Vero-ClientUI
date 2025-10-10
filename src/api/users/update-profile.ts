import { axiosInstance } from "../client";
import endpoints from "../endpoints";

interface IRequest {
  username?: string;
}

export const update_profile = async (data: IRequest) => {
  await axiosInstance.patch(endpoints.me(), data);
};
