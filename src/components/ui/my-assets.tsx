import React from "react";
import type { AssetValueDto } from "../../types/wallet";
import { AssetTile } from "../../features/dashboard/components/AssetTile";

interface IProps {
  assets: AssetValueDto[];
  loading: boolean;
  filter?: string;
  mode?: "list" | "select";
  onSelect?: (asset: AssetValueDto) => void;
}

export const MyAssets: React.FC<IProps> = ({
  assets,
  loading,
  mode = "list",
  onSelect,
  filter = "",
}) => {
  const filteredAssets = React.useMemo(() => {
    const query = filter.trim().toLowerCase();
    if (!query) return assets;

    return assets.filter(
      (asset) =>
        asset.name.toLowerCase().includes(query) ||
        asset.symbol.toLowerCase().includes(query)
    );
  }, [assets, filter]);

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

  if (filteredAssets.length === 0) {
    return (
      <div className="py-10 text-center text-[#6B7280] text-[15px]">
        No assets found
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredAssets.map((asset) => (
        <AssetTile
          key={asset.symbol.toLowerCase()}
          mode={mode}
          onSelect={onSelect}
          {...asset}
        />
      ))}
    </div>
  );
};
