import type React from "react";
import { useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import {
  CoinAmountCard,
  RoundedButton,
  WalletMaskDisplay,
} from "../../../components";
import { usePortfolio } from "../../../hooks";
import SvgIcon from "../../../components/ui/svg-icon";
import { AppIcons } from "../../../assets/svg";
import type { EnterAmountSchema } from "../schemas";
import type { UseFormReturn } from "react-hook-form";
import { useEffect, useState } from "react";
import { useSendDelegations } from "../hooks";
import type { DelegationSummaryDto } from "../../../types/models";

interface IProps {
  onSubmit: (data: EnterAmountSchema) => void;
  form: UseFormReturn<EnterAmountSchema>;
  toAddress: string;
  token: string;
  loadingGasFee: boolean;
  priceData: {
    estimatedCostMON: string;
    estimatedCostUSD: string;
  } | null;
}

export const EnterAmount: React.FC<IProps> = ({
  form,
  onSubmit,
  token,
  priceData,
  loadingGasFee,
}) => {
  const { loading, assets } = usePortfolio();

  const { list: delegations } = useSendDelegations();

  const selectedToken = assets.find((a) => a.symbol.toLowerCase() === token);
  const [search] = useSearchParams();

  const amount = form.watch("amount");
  const [isValid, setIsValid] = useState(false);
  const [selectedDelegation, setSelectedDelegation] =
    useState<DelegationSummaryDto | null>(null);
  const [showDelegationSelector, setShowDelegationSelector] = useState(false);

  const availableDelegations =
    delegations?.filter(
      (delegation) =>
        delegation.status === "active" && delegation.type === "allowance"
    ) || [];

  const availableBalance = selectedDelegation
    ? selectedDelegation.amountLimit
    : Number(selectedToken?.balance || 0);

  useEffect(() => {
    const subscription = form.watch(async (_value, { name }) => {
      if (name === "amount") {
        const isValid = await form.trigger("amount");
        setIsValid(isValid);
      }
    });

    return () => subscription.unsubscribe();
  }, [form]);

  const onPercentPillSelect = (value: number | "Max") => {
    if (!selectedToken && !selectedDelegation) return;

    const maxAmount = availableBalance;

    if (value === "Max") {
      form.setValue("amount", maxAmount.toString());
    } else {
      const amount = (Number(maxAmount) * value) / 100;
      form.setValue("amount", amount.toFixed(6));
    }
  };

  const handleDelegationSelect = (delegation: DelegationSummaryDto) => {
    setSelectedDelegation(delegation);
    setShowDelegationSelector(false);

    // If current amount exceeds delegation limit, adjust it
    const currentAmount = Number(form.getValues("amount"));
    if (currentAmount > delegation.amountLimit) {
      form.setValue("amount", delegation.amountLimit.toString());
    }
    form.setValue("delegation", delegation.id);
  };

  const handleRemoveDelegation = () => {
    setSelectedDelegation(null);
    form.setValue("delegation", undefined);
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-[#F9FAFB] text-[20px] leading-[28px]">To:</p>
        <div className="w-full h-[50px] py-[4px] px-[20px] bg-[#1A1C22] rounded-[50px] flex flex-row justify-between items-center">
          <WalletMaskDisplay
            address={search.get("to") || ""}
            className="text-[#F9FAFB]"
          />

          <SvgIcon
            icon={AppIcons["Edit"]}
            className="text-[#6B7280]"
            size={24}
          />
        </div>
      </div>

      {/* Delegation Selector */}
      {availableDelegations.length > 0 && (
        <div className="space-y-3">
          <p className="text-[#F9FAFB] text-[20px] leading-[28px]">
            Funding Source:
          </p>

          {selectedDelegation ? (
            <div className="w-full p-4 bg-[#1A1C22] rounded-[12px] border border-[#374151]">
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col gap-1">
                  <div className="flex flex-row items-center gap-2">
                    <span className="text-[#F9FAFB] text-[16px] font-medium">
                      {selectedDelegation.name}
                    </span>
                    <div className="px-2 py-1 bg-green-500/20 rounded-full">
                      <span className="text-green-400 text-xs font-medium">
                        Delegation
                      </span>
                    </div>
                  </div>
                  <span className="text-[#6B7280] text-sm">
                    Limit: {selectedDelegation.amountLimit}{" "}
                    {token.toUpperCase()}
                  </span>
                </div>
                <button
                  title="Close"
                  type="button"
                  onClick={handleRemoveDelegation}
                  className="p-2 text-[#6B7280] hover:text-[#F9FAFB] transition-colors"
                >
                  <SvgIcon icon={AppIcons["ArrowLeft"]} size={20} />
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowDelegationSelector(true)}
              className="w-full p-4 bg-[#1A1C22] rounded-[12px] border border-dashed border-[#374151] hover:border-[#6B7280] transition-colors flex flex-row items-center justify-between"
            >
              <span className="text-[#6B7280]">Use delegation</span>
              <SvgIcon
                icon={AppIcons["ArrowDown"]}
                className="text-[#6B7280]"
                size={20}
              />
            </button>
          )}

          {/* Delegation Selection Modal */}
          {showDelegationSelector && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-[#1A1C22] rounded-[20px] p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
                <div className="flex flex-row justify-between items-center mb-6">
                  <h3 className="text-[#F9FAFB] text-[20px] font-semibold">
                    Select Delegation
                  </h3>
                  <button
                    type="button"
                    title="Close"
                    onClick={() => setShowDelegationSelector(false)}
                    className="p-2 text-[#6B7280] hover:text-[#F9FAFB]"
                  >
                    <SvgIcon icon={AppIcons["ArrowLeft"]} size={24} />
                  </button>
                </div>

                <div className="space-y-3">
                  {availableDelegations.map((delegation) => (
                    <div
                      key={delegation.id}
                      onClick={() => handleDelegationSelect(delegation)}
                      className="p-4 bg-[#2A2C33] rounded-[12px] border border-transparent hover:border-[#374151] cursor-pointer transition-colors"
                    >
                      <div className="flex flex-row justify-between items-start">
                        <div className="flex flex-col gap-1">
                          <span className="text-[#F9FAFB] font-medium">
                            {delegation.name}
                          </span>
                          <span className="text-[#6B7280] text-sm">
                            {delegation.amountLimit} {token.toUpperCase()} limit
                          </span>
                          {delegation.frequency && (
                            <span className="text-[#6B7280] text-xs">
                              {delegation.frequency} allowance
                            </span>
                          )}
                        </div>
                        <div className="px-2 py-1 bg-green-500/20 rounded-full">
                          <span className="text-green-400 text-xs font-medium">
                            Active
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setShowDelegationSelector(false)}
                  className="w-full mt-6 p-3 bg-[#2A2C33] text-[#F9FAFB] rounded-[12px] hover:bg-[#374151] transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      <CoinAmountCard
        asset={selectedToken}
        label="Amount:"
        loading={loading}
        value={amount?.toString() || ""}
        onChange={(val) => form.setValue("amount", val)}
        maxAmount={availableBalance}
        delegation={selectedDelegation}
      />

      {/* Balance Info */}
      <div className="flex flex-row justify-between text-[#6B7280] text-sm">
        <span>Available:</span>
        <div className="flex flex-col items-end">
          <span className="text-[#F9FAFB]">
            {availableBalance.toFixed(6)} {token.toUpperCase()}
          </span>
          {selectedDelegation && (
            <span className="text-xs text-[#6B7280]">
              {selectedDelegation.amountLimit === availableBalance
                ? "Full delegation limit"
                : "Limited by token balance"}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-row justify-end gap-4 items-center">
        <PercentPill value={25} onClick={onPercentPillSelect} />
        <PercentPill value={50} onClick={onPercentPillSelect} />
        <PercentPill value={75} onClick={onPercentPillSelect} />
        <PercentPill value={"Max"} onClick={onPercentPillSelect} />
      </div>

      <AnimatePresence mode="wait">
        {priceData && (
          <motion.div
            key={priceData.estimatedCostMON + priceData.estimatedCostUSD} // ensure reanimation on change
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="flex flex-row justify-between text-[#F9FAFB] leading-[24px]"
          >
            <div className="opacity-60">Gas fees</div>
            <div>
              {priceData.estimatedCostMON} MON (${priceData.estimatedCostUSD})
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full mt-8"
      >
        <RoundedButton
          label="Review"
          className="w-full"
          disabled={!priceData || loadingGasFee || !isValid}
          type="button"
          onClick={() => form.handleSubmit(onSubmit)()}
        />
      </motion.div>
    </div>
  );
};

interface IPercentPillProps {
  value: number | "Max";
  onClick: (val: number | "Max") => void;
}

const PercentPill: React.FC<IPercentPillProps> = ({ value, onClick }) => {
  return (
    <motion.button
      type="button"
      className="py-[8px] bg-[#1A1C22] px-[12px] rounded-[20px] cursor-pointer text-[#F9FAFB] text-[16px]"
      onClick={() => onClick(value)}
      whileTap={{
        scale: 0.98,
      }}
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        ease: "easeIn",
        delay: 0.4,
      }}
    >
      {typeof value === "number" ? `${value}%` : value}
    </motion.button>
  );
};
