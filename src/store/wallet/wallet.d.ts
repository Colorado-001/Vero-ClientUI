import type { AssetValueDto } from "../../types/wallet";

export type WalletState = {
  assets: AssetValueDto[];
  usdBalance: number | null;
  loading: boolean;
};

export type WalletActions = {
  loadPortfolio: () => Promise<void>;
};
