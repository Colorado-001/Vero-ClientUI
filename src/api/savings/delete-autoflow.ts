import { axiosInstance } from "../client";
import endpoints from "../endpoints";

export const deleteAutoFlow = async (id: string) => {
  await axiosInstance.delete(endpoints.autoflow(), {
    params: {
      id,
    },
  });
};
