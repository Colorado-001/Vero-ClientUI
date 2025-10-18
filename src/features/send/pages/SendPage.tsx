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

  return (
    <div className="pt-[120px] w-full px-6">
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
