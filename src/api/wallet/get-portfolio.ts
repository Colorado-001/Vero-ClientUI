import type { AssetValueDto } from "../../types/wallet";
import { axiosInstance } from "../client";
import endpoints from "../endpoints";

interface IResponse {
  assets: AssetValueDto[];
  usdBalance: string;
}

export const get_portfolio = async () => {
  return (await axiosInstance.get<IResponse>(endpoints.getPortfolio())).data;
};
