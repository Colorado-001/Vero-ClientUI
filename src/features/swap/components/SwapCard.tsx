import type React from "react";
import { CryptoIcon } from "../../../components";
import type { AssetValueDto } from "../../../types/wallet";

interface IProps {
  label: string;
  asset: AssetValueDto | undefined;
  loading?: boolean;
}

export const SwapCard: React.FC<IProps> = ({ label, asset, loading }) => {
  if (loading || !asset) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-start gap-2 w-full">
      <p className="text-[#F9FAFB] text-[20px] leading-[28px]">{label}</p>

      <div className="bg-[#1A1C22] rounded-[28px] p-[20px] w-full">
        <div className="flex flex-row items-center gap-2 pb-4 border-b border-[#6B728033]">
          <CryptoIcon logoURI={asset.logoURI} name={asset.name} />

          <div className="flex-1">
            <p className="text-[20px] text-[#F9FAFB] leading-[28px]">
              {asset.name} on Monad
            </p>
            <p className="text-[#6B7280] text-[14px]">
              Available: {asset.balance} {asset.symbol}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
