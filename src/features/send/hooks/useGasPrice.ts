import { useCallback, useEffect, useState } from "react";
import * as transferApi from "../../../api/transfer";
import { withErrorHandling } from "../../../utils/error";

export const useGasPrice = (
  amount: string,
  to: string,
  tokenSymbol?: string,
  delay = 600 // ms debounce delay
) => {
  const [priceData, setPriceData] = useState<{
    estimatedCostMON: string;
    estimatedCostUSD: string;
  } | null>(null);

  const [loading, setLoading] = useState(false);

  const loadPrice = useCallback(async () => {
    if (!amount || !to || Number(amount) <= 0) return;

    setLoading(true);
    const { data, isError } = await withErrorHandling(() =>
      transferApi.getGasPrice({ to, tokenSymbol, amount })
    );

    if (!isError && data) {
      setPriceData(data);
    }
    setLoading(false);
  }, [amount, to, tokenSymbol]);

  // Debounce effect
  useEffect(() => {
    if (!amount || !to || Number(amount) <= 0) {
      setPriceData(null);
      return;
    }

    const handler = setTimeout(() => {
      loadPrice();
    }, delay);

    return () => clearTimeout(handler);
  }, [amount, to, tokenSymbol, delay, loadPrice]);

  return { priceData, loading, reload: loadPrice };
};
