import type React from "react";
import type { AssetValueDto } from "../../types/wallet";
import { CryptoIcon } from "./crypto-icon";
import SvgIcon from "./svg-icon";
import { AppIcons } from "../../assets/svg";
import { Input } from "./input";

interface IProps {
  label: string;
  asset: AssetValueDto | undefined;
  loading?: boolean;
  inputDisabled?: boolean;
  value?: string;
  onChange?: (val: string) => void;
}

export const CoinAmountCard: React.FC<IProps> = ({
  label,
  loading,
  asset,
  inputDisabled,
  value,
  onChange,
}) => {
  if (loading || !asset) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-start gap-2 w-full">
      <p className="text-[#F9FAFB] text-[20px] leading-[28px]">{label}</p>

      <div className="bg-[#1A1C22] rounded-[28px] p-[20px] pb-0 w-full">
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

          <SvgIcon
            icon={AppIcons["ArrowDown"]}
            className="text-[#F9FAFB]"
            size={24}
          />
        </div>

        <div className="py-4 pt-0 w-full grid grid-cols-3">
          <div className="flex-1">
            <Input
              type="text"
              title="amount"
              className="outline-none bg-transparent"
              autoFocus={!inputDisabled}
              disabled={inputDisabled}
              placeholder="1.00"
              value={value}
              onChange={(e) => onChange && onChange(e.target.value)}
            />
          </div>

          <div className="w-full my-auto">
            <SvgIcon
              icon={AppIcons["Swap"]}
              className="text-[#F9FAFB] mx-auto"
            />
          </div>

          <div className="text-[14px] text-[#6B7280] text-end my-auto">
            {value && !isNaN(Number(value))
              ? `$${(Number(value) * asset.usdPrice).toLocaleString()}`
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};
