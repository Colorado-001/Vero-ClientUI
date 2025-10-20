import { axiosInstance } from "../client";
import endpoints from "../endpoints";

interface IRequest {
  to: string;
  amount: string;
  tokenSymbol?: string;
  delegation?: string;
}

interface IResponse {
  success: boolean;
}

export const send = async (data: IRequest) => {
  return (await axiosInstance.post<IResponse>(endpoints.sendMoney(), data))
    .data;
};
