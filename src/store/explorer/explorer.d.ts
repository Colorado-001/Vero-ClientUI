import type { UserSavingsDepositData } from "../../types/models";

export type ExplorerState = {
  data: UserSavingsDepositData[];
  loading: boolean;
  lastUpdated: string | null;
};

export type ExplorerActions = {
  loadData(refresh: boolean): Promise<void>;
};
