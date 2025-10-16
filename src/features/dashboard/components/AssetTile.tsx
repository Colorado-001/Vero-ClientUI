import { motion } from "motion/react";
import type React from "react";
import type { AssetValueDto } from "../../../types/wallet";

export const AssetTile: React.FC<AssetValueDto> = (asset) => {
  return (
    <motion.div
      className="pb-[20px] w-full border-b border-b-[#6B728033] flex flex-row gap-4 items-center"
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
        <p className="text-[20px] text-[#F9FAFB] leading-[28px]">
          {asset.name}
        </p>
        <p className="text-[14px] text-[#6B7280]">
          {asset.balance} {asset.symbol}
        </p>
      </div>

      <div className="text-end">
        <p className="text-[20px] text-[#F9FAFB] leading-[28px]">
          ${asset.usdValue}
        </p>
        <p className="text-[14px] text-[#6B7280]">...</p>
      </div>
    </motion.div>
  );
};
