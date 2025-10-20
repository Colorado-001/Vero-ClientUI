import type React from "react";
import type { AssetValueDto } from "../../types/wallet";
import { CryptoIcon } from "./crypto-icon";
import SvgIcon from "./svg-icon";
import { AppIcons } from "../../assets/svg";
import { Input } from "./input";
import type { DelegationSummaryDto } from "../../types/models";

interface IProps {
  label: string;
  asset: AssetValueDto | undefined;
  loading?: boolean;
  inputDisabled?: boolean;
  value?: string;
  onChange?: (val: string) => void;
  maxAmount?: number;
  delegation?: DelegationSummaryDto | null;
}

export const CoinAmountCard: React.FC<IProps> = ({
  label,
  loading,
  asset,
  inputDisabled,
  value,
  onChange,
  maxAmount,
  delegation,
}) => {
  if (loading || !asset) {
    return (
      <div className="flex flex-col items-start gap-2 w-full">
        <div className="h-6 bg-[#2A2C33] rounded animate-pulse w-32"></div>
        <div className="bg-[#1A1C22] rounded-[28px] p-[20px] w-full h-[140px] animate-pulse"></div>
      </div>
    );
  }

  // Calculate available balance considering delegation limit
  const availableBalance = maxAmount !== undefined ? maxAmount : asset.balance;

  // Check if amount exceeds delegation limit
  const amountExceedsLimit =
    delegation && value ? parseFloat(value) > delegation.amountLimit : false;

  const handleChange = (val: string) => {
    if (!onChange) return;

    // Allow empty string for deletion
    if (val === "") {
      onChange(val);
      return;
    }

    // Validate numeric input
    const numValue = parseFloat(val);
    if (isNaN(numValue)) return;

    // Enforce max amount if provided
    if (maxAmount !== undefined && numValue > maxAmount) {
      onChange(maxAmount.toString());
    } else {
      onChange(val);
    }
  };

  return (
    <div className="flex flex-col items-start gap-2 w-full">
      <div className="flex flex-row justify-between items-center w-full">
        <p className="text-[#F9FAFB] text-[20px] leading-[28px]">{label}</p>

        {/* Delegation Badge */}
        {delegation && (
          <div className="flex flex-row items-center gap-2 px-3 py-1 bg-green-500/20 rounded-full">
            <SvgIcon
              icon={AppIcons["TickCircle"]}
              className="text-green-400"
              size={16}
            />
            <span className="text-green-400 text-sm font-medium">
              Delegated
            </span>
          </div>
        )}
      </div>

      <div className="bg-[#1A1C22] rounded-[28px] p-[20px] pb-0 w-full border border-transparent relative">
        {/* Delegation Limit Warning */}
        {amountExceedsLimit && (
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
            <div className="flex flex-row items-center gap-2 px-3 py-1 bg-amber-500/20 rounded-full border border-amber-500/30">
              <SvgIcon
                icon={AppIcons["Warning"]}
                className="text-amber-400"
                size={14}
              />
              <span className="text-amber-400 text-xs font-medium">
                Exceeds delegation limit
              </span>
            </div>
          </div>
        )}

        <div className="flex flex-row items-center gap-2 pb-4 border-b border-[#6B728033]">
          <CryptoIcon logoURI={asset.logoURI} name={asset.name} />

          <div className="flex-1">
            <p className="text-[20px] text-[#F9FAFB] leading-[28px]">
              {asset.name} on Monad
            </p>

            {/* Enhanced Available Balance Display */}
            <div className="flex flex-row items-center gap-2">
              <p className="text-[#6B7280] text-[14px]">
                Available: {Number(availableBalance).toFixed(6)} {asset.symbol}
              </p>
            </div>
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
              type="number"
              title="amount"
              className={`outline-none bg-transparent text-[20px] ${
                amountExceedsLimit ? "text-amber-400" : "text-[#F9FAFB]"
              }`}
              autoFocus={!inputDisabled}
              disabled={inputDisabled}
              placeholder="0.00"
              value={value}
              onChange={(e) => handleChange(e.target.value)}
              min="0"
              max={availableBalance}
              step="0.000001"
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
              ? `$${(Number(value) * asset.usdPrice).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`
              : null}
          </div>
        </div>

        {/* Progress bar showing usage of delegation limit */}
        {delegation && value && !isNaN(Number(value)) && (
          <div className="mt-2 mb-2">
            <div className="flex flex-row justify-between text-[#6B7280] text-[12px] mb-1">
              <span>Delegation Usage</span>
              <span>
                {Math.min(
                  100,
                  (Number(value) / delegation.amountLimit) * 100
                ).toFixed(1)}
                %
              </span>
            </div>
            <div className="w-full bg-[#2A2C33] rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  Number(value) / delegation.amountLimit > 0.9
                    ? "bg-amber-400"
                    : Number(value) / delegation.amountLimit > 0.7
                    ? "bg-yellow-400"
                    : "bg-green-400"
                }`}
                style={{
                  width: `${Math.min(
                    100,
                    (Number(value) / delegation.amountLimit) * 100
                  )}%`,
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
