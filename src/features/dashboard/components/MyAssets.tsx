import type React from "react";
import type { AssetValueDto } from "../../../types/wallet";
import { AssetTile } from "./AssetTile";

interface IProps {
  assets: AssetValueDto[];
  loading: boolean;
}

export const MyAssets: React.FC<IProps> = ({ assets, loading }) => {
  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="flex flex-row gap-4 items-center pb-[20px] w-full border-b border-b-[#6B728033]"
          >
            {/* Logo placeholder */}
            <div className="rounded-full bg-[#2A2C33] h-[50px] w-[50px]" />

            {/* Text placeholder */}
            <div className="flex-1 space-y-2">
              <div className="h-[20px] bg-[#2A2C33] rounded w-1/2" />
              <div className="h-[14px] bg-[#2A2C33] rounded w-1/3" />
            </div>

            {/* Value placeholder */}
            <div className="space-y-2 text-end">
              <div className="h-[20px] bg-[#2A2C33] rounded w-[60px] ml-auto" />
              <div className="h-[14px] bg-[#2A2C33] rounded w-[40px] ml-auto" />
            </div>
          </div>
        ))}
      </div>
    );
  }
  return assets.map((asset) => (
    <AssetTile key={asset.symbol.toLowerCase()} {...asset} />
  ));
};
