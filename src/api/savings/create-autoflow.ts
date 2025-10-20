import type { AutoflowSavingDto } from "../../types/models";
import { axiosInstance } from "../client";
import endpoints from "../endpoints";

export interface ICreateAutoFlowRequest {
  name: string;
  frequency: string;
  dayOfMonth: number;
  amountToSave: number;
  tokenToSave: string;
}

export const createAutoFlow = async (data: ICreateAutoFlowRequest) => {
  return (
    await axiosInstance.post<AutoflowSavingDto>(endpoints.autoflow(), data)
  ).data;
};
