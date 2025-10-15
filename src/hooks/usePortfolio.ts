import { useEffect } from "react";
import { useWalletStore } from "../store/wallet/wallet.store";
import { withErrorHandling } from "../utils/error";

export const usePortfolio = () => {
  const { loadPortfolio, ...store } = useWalletStore();

  useEffect(() => {
    (async () => {
      await withErrorHandling<void>(loadPortfolio);
    })();
  }, [loadPortfolio]);

  return store;
};
