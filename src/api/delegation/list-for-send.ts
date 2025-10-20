import type { DelegationSummaryDto } from "../../types/models";
import { axiosInstance } from "../client";
import endpoints from "../endpoints";

export const getMyDelegationsForSend = async () => {
  return (
    await axiosInstance.get<DelegationSummaryDto[]>(
      endpoints.delegationForSend()
    )
  ).data;
};
