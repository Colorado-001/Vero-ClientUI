import type { AssetValueDto } from "../../types/wallet";

export type WalletState = {
  assets: AssetValueDto[];
  usdBalance: string | null;
  loading: boolean;
};

export type WalletActions = {
  loadPortfolio: () => Promise<void>;
};
