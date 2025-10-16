import { useEffect, useState } from "react";
import { usePortfolio } from "../../../hooks";
import { SwapCard } from "../components";
import type { AssetValueDto } from "../../../types/wallet";
import { RoundedButton } from "../../../components";

export const SwapPage = () => {
  const { loading, assets } = usePortfolio();

  const [from, setFrom] = useState<AssetValueDto | null>(null);

  useEffect(() => {
    if (assets.length > 0 && !from) {
      setFrom(assets[0]);
    }
  }, [assets, from]);

  return (
    <div className="pt-[120px] px-4">
      <div className="flex flex-col gap-8">
        <SwapCard label="From:" asset={from || undefined} loading={loading} />
        <SwapCard label="To:" asset={from || undefined} loading={loading} />
      </div>

      <div className="mt-8">
        <RoundedButton label="Confirm Swap" className="w-full" />
      </div>
    </div>
  );
};
