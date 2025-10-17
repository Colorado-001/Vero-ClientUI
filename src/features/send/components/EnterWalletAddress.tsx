import type React from "react";
import { motion } from "motion/react";
import {
  walletAddressSchema,
  type SelectWalletAddressSchema,
} from "../schemas";
import type { UseFormReturn } from "react-hook-form";
import { Form } from "../../../components/ui/form";
import { FormInput, WalletMaskDisplay } from "../../../components";
import SvgIcon from "../../../components/ui/svg-icon";
import { AppIcons } from "../../../assets/svg";
import { useEffect, useState } from "react";

interface IProps {
  onSubmit: (data: SelectWalletAddressSchema) => void;
  form: UseFormReturn<SelectWalletAddressSchema>;
}

export const EnterWalletAddress: React.FC<IProps> = ({ form, onSubmit }) => {
  const address = form.watch("address");
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const result = walletAddressSchema.safeParse(address);
    setIsValid(result.success);
  }, [address]);

  const handleSelect = () => {
    if (isValid) {
      form.handleSubmit(onSubmit)();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormInput
          form={form}
          placeholder="Wallet Address"
          name="address"
          className="w-full"
          suffixIcon={
            <SvgIcon
              icon={AppIcons["ScanBarcode"]}
              className="text-[#6B7280]"
              size={24}
            />
          }
        />

        {isValid && (
          <motion.div
            className="w-full mt-4 flex cursor-pointer flex-row gap-2 items-center text-[#F9FAFB]"
            onClick={handleSelect}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              ease: "easeIn",
            }}
            whileTap={{
              scale: 0.98,
            }}
          >
            <div className="bg-[#1A1C22] flex justify-center items-center h-[40px] w-[40px] rounded-full">
              <SvgIcon
                className="text-[#6B7280]"
                icon={AppIcons["WalletCheck"]}
                size={24}
              />
            </div>

            <WalletMaskDisplay
              address={address}
              className="text-[20px] leading-[28px] block"
            />
          </motion.div>
        )}
      </form>
    </Form>
  );
};
