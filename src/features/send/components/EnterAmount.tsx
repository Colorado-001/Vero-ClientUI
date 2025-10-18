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

  const selectedToken = assets.find((a) => a.symbol.toLowerCase() === token);
  const [search] = useSearchParams();

  const amount = form.watch("amount");
  const [isValid, setIsValid] = useState(false);

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
    if (!selectedToken) return;

    if (value === "Max") {
      form.setValue("amount", selectedToken.balance);
    } else {
      const amount = (Number(selectedToken.balance) * value) / 100;
      form.setValue("amount", amount.toFixed(6));
    }
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

      <CoinAmountCard
        asset={selectedToken}
        label="Amount:"
        loading={loading}
        value={amount?.toString() || ""}
        onChange={(val) => form.setValue("amount", val)}
      />

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
