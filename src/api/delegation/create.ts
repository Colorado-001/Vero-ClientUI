import type { CreateDelegationSchema } from "../../features/delegation/types";
import { axiosInstance } from "../client";
import endpoints from "../endpoints";

export interface IResponse {
  success: boolean;
  delegation?: unknown;
  signedDelegation?: unknown;
  error?: string;
}

export const createDelegation = async (data: CreateDelegationSchema) => {
  return (await axiosInstance.post<IResponse>(endpoints.delegations(), data))
    .data;
};
