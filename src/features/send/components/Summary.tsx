import type React from "react";
import { motion } from "motion/react";
import { AppIcons } from "../../../assets/svg";
import SvgIcon from "../../../components/ui/svg-icon";
import type { AssetValueDto } from "../../../types/wallet";
import { RoundedButton, WalletMaskDisplay } from "../../../components";

interface IProps {
  amount: string;
  asset: AssetValueDto;
  toAddress: string;
  network: string;
  networkFee: {
    estimatedCostMON: string;
    estimatedCostUSD: string;
  };
  loading: boolean;
  triggerSend: () => Promise<void>;
}

export const Summary: React.FC<IProps> = ({
  amount,
  asset,
  toAddress,
  network,
  networkFee,
  loading,
  triggerSend,
}) => {
  return (
    <div className="flex-1 flex flex-col w-full items-center gap-8">
      <div className="space-y-2">
        <div className="h-[50px] mx-auto bg-[#1A1C22] w-[50px] rounded-full flex items-center justify-center">
          <SvgIcon
            icon={AppIcons["Send"]}
            className="text-[#F9FAFB]"
            size={28}
          />
        </div>

        <div>
          <div className="text-center font-bold text-[#F9FAFB] text-[40px]">
            {amount} {asset.symbol.toUpperCase()}
          </div>

          <div className="text-center text-[14px] text-[#6B7280]">
            {amount && !isNaN(Number(amount))
              ? `$${(Number(amount) * asset.usdPrice).toLocaleString()}`
              : null}
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          ease: "easeOut",
        }}
        className="bg-[#1A1C22] w-full rounded-[#1A1C22] py-[18px] px-[16px] gap-[12px] flex flex-col items-start rounded-[20px]"
      >
        <div className="w-full flex flex-row justify-between items-center text-[#F9FAFB] text-sm leading-[24px]">
          <p className="opacity-[0.6]">To</p>
          <WalletMaskDisplay address={toAddress} />
        </div>

        <div className="w-full flex flex-row justify-between items-center text-[#F9FAFB] text-sm leading-[24px]">
          <p className="opacity-[0.6]">Network Fee</p>
          <div className="text-end">
            {networkFee.estimatedCostMON} MON (${networkFee.estimatedCostUSD})
          </div>
        </div>

        <div className="w-full flex flex-row justify-between items-center text-[#F9FAFB] text-sm leading-[24px]">
          <p className="opacity-[0.6]">Network</p>
          <div className="text-end">{network}</div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
        className="w-full rounded-[20px] py-[16px] px-[12px] bg-[#1A1C22] gap-[16px] flex flex-row"
      >
        <div>
          <SvgIcon icon={AppIcons["Warning"]} size={20} />
        </div>

        <div>
          <p className="text-[14px] text-[#6B7280] items-start">
            To prevent loss of funds, use this address on exchanges or assets
            compatible with the following networks: Ethereum, Solana, Base,
            Arbitrum, Polygon
          </p>
        </div>
      </motion.div>

      <div className="w-full">
        <RoundedButton
          label="Send"
          className="w-full"
          onClick={triggerSend}
          loading={loading}
          disabled={loading}
        />
      </div>
    </div>
  );
};
