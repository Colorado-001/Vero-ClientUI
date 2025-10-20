import type { AutoflowSavingDto } from "../../types/models";
import { axiosInstance } from "../client";
import endpoints from "../endpoints";

export const getAutoFlows = async () => {
  return (await axiosInstance.get<AutoflowSavingDto[]>(endpoints.autoflow()))
    .data;
};
