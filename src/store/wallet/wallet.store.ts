import { create } from "zustand";
import type { WalletActions, WalletState } from "./wallet";
import * as walletApi from "../../api/wallet";

export const useWalletStore = create<WalletState & WalletActions>()(
  (set, get) => ({
    assets: [],
    usdBalance: null,
    loading: false,

    async loadPortfolio(refresh = false) {
      try {
        const { loading, usdBalance, assets } = get();

        const shouldLoad = !loading && (!usdBalance || assets.length === 0);

        if (shouldLoad || refresh) {
          set({ loading: true });
          const result = await walletApi.get_portfolio();

          set({
            assets: result.assets,
            usdBalance: result.usdBalance,
          });
        } else {
          console.log("Cached portfolio skip load");
        }
      } finally {
        set({ loading: false });
      }
    },
  })
);
