import { motion } from "motion/react";
import type React from "react";
import type { AssetValueDto } from "../../../types/wallet";

export const AssetTile: React.FC<
  AssetValueDto & {
    mode: "list" | "select";
    onSelect?: (asset: AssetValueDto) => void;
  }
> = ({ onSelect, mode, ...asset }) => {
  const isSelectable = mode === "select";

  const handleClick = () => {
    if (isSelectable && onSelect) {
      onSelect(asset);
    }
  };

  return (
    <motion.div
      onClick={handleClick}
      className={`pb-[20px] w-full border-b border-b-[#6B728033] flex flex-row gap-4 items-center transition-all duration-150 select-none
        ${
          isSelectable
            ? "cursor-pointer active:scale-[0.97] active:opacity-80"
            : "cursor-default"
        }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        ease: "easeOut",
      }}
    >
      <div className="rounded-full bg-[#627eea2A] h-[50px] w-[50px] flex items-center justify-center">
        <img
          src={asset.logoURI}
          alt={asset.name}
          className="object-contain h-[30px]"
        />
      </div>

      <div className="flex-1 text-start">
        <p className="text-[18px] sm:text-[20px] text-[#F9FAFB] leading-[26px] sm:leading-[28px]">
          {asset.name}
        </p>
        <p className="text-[13px] sm:text-[14px] text-[#6B7280]">
          {asset.balance} {asset.symbol}
        </p>
      </div>

      {!isSelectable && (
        <div className="text-end">
          <p className="text-[18px] sm:text-[20px] text-[#F9FAFB] leading-[26px] sm:leading-[28px]">
            ${asset.usdValue}
          </p>
          <p className="text-[13px] sm:text-[14px] text-[#6B7280]">...</p>
        </div>
      )}
    </motion.div>
  );
};
