import { FormDropDown, FormInput, RoundedButton } from "../../../components";
import { Form } from "../../../components/ui/form";
import { useCreateDelegation } from "../hooks";

export const CreateDelegationPage = () => {
  const { onSubmit, form } = useCreateDelegation();

  const typeOfDelegation = form.watch("type");

  return (
    <div className="px-6 pt-[120px]" id="createDelegationPage">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormDropDown
            label="Type"
            form={form}
            name="type"
            placeholder="Allowance"
            options={[
              { label: "Allowance", value: "allowance" },
              { label: "Group Wallet", value: "group_wallet" },
            ]}
          />

          <FormInput
            label={
              typeOfDelegation === "group_wallet"
                ? "Wallet Name"
                : "Delegate Name"
            }
            placeholder={
              typeOfDelegation === "group_wallet" ? "Spain Vacation" : "Save"
            }
            form={form}
            name={"name"}
          />

          {typeOfDelegation === "allowance" && (
            <>
              <FormInput
                label="Wallet Address"
                form={form}
                name={"walletAddress"}
                placeholder="0x7y89.....34"
              />

              <FormDropDown
                form={form}
                name="frequency"
                label="Frequency"
                options={[{ label: "Daily", value: "Daily" }]}
                placeholder="Daily"
              />

              <FormInput
                label="Start Date"
                form={form}
                name={"startDate"}
                type="date"
              />
            </>
          )}

          <FormInput
            form={form}
            label={
              typeOfDelegation === "allowance"
                ? "Account Limit (MON)"
                : "Spending Limit (MOM)"
            }
            name="amountLimit"
            placeholder="Enter Amount"
          />

          <div className="mt-14 w-full">
            <RoundedButton
              label="Create Delegation"
              className="w-full"
              type="submit"
              // loading={creating}
              // disabled={creating || loading}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};
