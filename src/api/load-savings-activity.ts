import axios from "axios";
import type { UserSavingsDepositData } from "../types/models";

interface IResponse {
  SavingsVault_DepositMade: {
    id: string;
    user: string;
    amount: string;
    newBalance: string;
    timestamp: string;
  }[];
}

export const loadSavingsActivity = async (): Promise<
  UserSavingsDepositData[]
> => {
  const {
    data: { SavingsVault_DepositMade },
  } = await axios.get<IResponse>(
    "http://209.38.74.188:8000/api/v1/indexer/deposits"
  );

  return SavingsVault_DepositMade;
};
