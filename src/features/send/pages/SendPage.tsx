import { EnterWalletAddress } from "../components";
import { useSend } from "../hooks";

export const SendPage = () => {
  const { step, submitWalletAddress, walletAddressForm } = useSend();

  return (
    <div className="pt-[120px] w-full px-4">
      {step === "enter-wallet" && (
        <EnterWalletAddress
          onSubmit={submitWalletAddress}
          form={walletAddressForm}
        />
      )}
    </div>
  );
};
