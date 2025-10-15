import { create } from "zustand";
import type { WalletActions, WalletState } from "./wallet";
import * as walletApi from "../../api/wallet";

export const useWalletStore = create<WalletState & WalletActions>()(
  (set, get) => ({
    assets: [],
    usdBalance: null,
    loading: false,

    async loadPortfolio() {
      try {
        if (!get().usdBalance || get().assets.length === 0) {
          set({ loading: true });
          const result = await walletApi.get_portfolio();

          set({
            assets: result.assets,
            usdBalance: result.usdBalance,
          });
        }
      } finally {
        set({ loading: false });
      }
    },
  })
);
