import { axiosInstance } from "../client";
import endpoints from "../endpoints";

interface IRequest {
  to: string;
  amount: string;
  tokenSymbol?: string;
}

interface IResponse {
  estimatedCostMON: string;
  estimatedCostUSD: string;
}

export const getGasPrice = async (data: IRequest) => {
  return (
    await axiosInstance.get<IResponse>(endpoints.getGas(), {
      params: data,
    })
  ).data;
};
