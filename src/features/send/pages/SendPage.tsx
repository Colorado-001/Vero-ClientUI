import { useEffect } from "react";
import { useUtilStore } from "../../../store";
import { EnterAmount, EnterWalletAddress, Summary } from "../components";
import { useSend } from "../hooks";

export const SendPage = () => {
  const {
    step,
    walletAddressForm,
    amountForm,
    toAddress,
    token,
    amount,
    selectedToken,
    priceData,
    loadingGasFee,
    sending,
    submitWalletAddress,
    submitAmount,
    triggerSend,
  } = useSend();

  const { setForceHideFbb } = useUtilStore();

  useEffect(() => {
    setForceHideFbb(true);
    return () => {
      setForceHideFbb(false);
    };
  }, [setForceHideFbb]);

  return (
    <div className="pt-[120px] w-full px-6 pb-[80px]">
      {step === "enter-wallet" && (
        <EnterWalletAddress
          onSubmit={submitWalletAddress}
          form={walletAddressForm}
        />
      )}

      {step === "enter-amount" && token && (
        <EnterAmount
          form={amountForm}
          onSubmit={submitAmount}
          toAddress={toAddress}
          token={token}
          priceData={priceData}
          loadingGasFee={loadingGasFee}
        />
      )}

      {step === "review" && selectedToken && toAddress && priceData && (
        <Summary
          amount={amount}
          asset={selectedToken}
          network="Monad"
          networkFee={priceData}
          toAddress={toAddress}
          triggerSend={triggerSend}
          loading={sending}
        />
      )}
    </div>
  );
};
