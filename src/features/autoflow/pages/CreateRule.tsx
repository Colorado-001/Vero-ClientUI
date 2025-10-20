import { useCreateFlow } from "../hooks";
import {
  FormDropDown,
  FormInput,
  RoundedButton,
  type DropdownActions,
} from "../../../components";
import { Form } from "../../../components/ui/form";
import { SelectTokenPage } from "../../../components/pages";
import type { AssetValueDto } from "../../../types/wallet";
import { useEffect, useRef } from "react";
import { usePortfolio } from "../../../hooks";
import { useUtilStore } from "../../../store";

export const CreateRulePage = () => {
  const { form, onSubmit, loading: creating } = useCreateFlow();
  const { assets, loading } = usePortfolio();
  const { setForceHideFbb } = useUtilStore();

  useEffect(() => {
    setForceHideFbb(true);
    return () => {
      setForceHideFbb(false);
    };
  }, [setForceHideFbb]);

  const token = form.watch("tokenToSave");
  const amount = form.watch("amountToSave");
  const day = form.watch("dayOfMonth");
  const selectedToken = assets.find((a) => a.symbol === token);

  const dropdownRef = useRef<DropdownActions>(null);

  const getSubText = () => {
    const isValidAmount = !form.getFieldState("amountToSave").invalid;
    const isValidDay = !form.getFieldState("dayOfMonth").invalid;

    if (isValidAmount && isValidDay && selectedToken && amount) {
      return `You'll save ${amount} ${selectedToken.symbol} every day ${day} of each month`;
    }
    return null;
  };

  return (
    <div className="pt-[120px] space-y-14 px-6" id="createRulePage">
      <p className="text-[14px] text-[#6B7280] text-start mb-12">
        Choose the date of the month and the amount to automatically save.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormInput
            label="Name"
            form={form}
            name="name"
            placeholder="Buy a new car"
          />

          <FormDropDown
            label="Frequency"
            form={form}
            name="frequency"
            placeholder="Every Month"
            options={[{ label: "Every Month", value: "monthly" }]}
          />

          <FormInput
            label="Day of the Month (1 - 31)"
            placeholder="19"
            form={form}
            name={"dayOfMonth"}
          />

          <FormDropDown
            label="Asset to Save"
            form={form}
            name="tokenToSave"
            placeholder="MON"
            options={assets.map((a) => ({
              label: a.name,
              value: a.symbol,
            }))}
            disabled={loading}
            dropdownRef={dropdownRef}
            portalTarget={"createRulePage"}
            customSelect={
              <div className="bg-[#0F1115] z-[999]">
                <SelectTokenPage
                  onSelect={(asset: AssetValueDto) => {
                    dropdownRef.current?.select(asset.symbol);
                    form.setValue("tokenToSave", asset.symbol);
                  }}
                />
              </div>
            }
          />

          <div>
            <FormInput
              label={`Amount to Save (${selectedToken?.symbol || "-"})`}
              placeholder="Enter Amount"
              form={form}
              name={"amountToSave"}
            />
            <p className="text-[#6B7280] text-[14px] mt-1">{getSubText()}</p>
          </div>

          <div className="mt-14 w-full">
            <RoundedButton
              label="Save"
              className="w-full"
              type="submit"
              loading={creating}
              disabled={creating || loading}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};
