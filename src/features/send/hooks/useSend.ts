import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import type { SendStep } from "../types";
import { SEND_STEPS } from "../constants";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  enterAmountSchema,
  selectWalletAddressSchema,
  type EnterAmountSchema,
  type SelectWalletAddressSchema,
} from "../schemas";
import { usePortfolio } from "../../../hooks";
import { useGasPrice } from "./useGasPrice";
import { withErrorHandling } from "../../../utils/error";
import * as transferApi from "../../../api/transfer";
import { toast } from "sonner";

export const useSend = () => {
  const navigate = useNavigate();
  const { token } = useParams<{ token?: string }>();
  const { assets } = usePortfolio();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialValues = {
    step: (() => {
      const stepFromUrl = searchParams.get("step") as SendStep | null;
      if (!stepFromUrl) return "enter-wallet";
      return SEND_STEPS.includes(stepFromUrl) ? stepFromUrl : "enter-wallet";
    })(),
    walletAddress: searchParams.get("to") || "",
    amount: (() => {
      const amount = searchParams.get("amount") || null;
      if (amount && !isNaN(Number(amount))) {
        return amount;
      }
      return null;
    })(),
  };

  const walletAddressForm = useForm({
    resolver: zodResolver(selectWalletAddressSchema),
    defaultValues: { address: initialValues.walletAddress },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const amountForm = useForm({
    resolver: zodResolver(enterAmountSchema),
    defaultValues: initialValues.amount
      ? { amount: initialValues.amount }
      : undefined,
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const [sending, setSending] = useState(false);
  const [step, setStep] = useState<SendStep>(initialValues.step);
  const toAddress = walletAddressForm.watch("address");
  const amount = amountForm.watch("amount");
  const selectedToken = assets.find((a) => a.symbol.toLowerCase() === token);

  const { loading: loadingGasFee, priceData } = useGasPrice(
    amount?.toString(),
    toAddress,
    token
  );

  useEffect(() => {
    const newStep = searchParams.get("step") as SendStep | null;

    if (newStep && newStep !== step) {
      setStep(newStep);
    }
  }, [searchParams, step]);

  // Redirect if no token --> token is crypto type being sent ;)
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  const nextStep = useCallback(
    (set?: Record<string, string>) => {
      const currentIndex = SEND_STEPS.indexOf(step);
      if (currentIndex < SEND_STEPS.length - 1) {
        const newStep = SEND_STEPS[currentIndex + 1];

        setStep(newStep);
        setSearchParams(
          (prev) => {
            const params = new URLSearchParams(prev);
            params.set("step", newStep);
            if (set) {
              Object.entries(set).forEach(([key, value]) => {
                params.set(key, value);
              });
            }
            return params;
          },
          { replace: false }
        );
      }
    },
    [setSearchParams, step]
  );

  // const prevStep = useCallback(() => {
  //   const currentIndex = SEND_STEPS.indexOf(step);
  //   if (currentIndex > 0) {
  //     const newStep = SEND_STEPS[currentIndex - 1];
  //     setStep(newStep);
  //     setSearchParams(
  //       (prev) => {
  //         const params = new URLSearchParams(prev);
  //         params.set("step", newStep);
  //         return params;
  //       },
  //       { replace: false }
  //     );
  //   }
  // }, [step, setSearchParams]);

  const submitWalletAddress = useCallback(
    (data: SelectWalletAddressSchema) => {
      nextStep({ to: data.address });
    },
    [nextStep]
  );

  const submitAmount = useCallback(
    (data: EnterAmountSchema) => {
      nextStep({ amount: data.amount.toString() });
    },
    [nextStep]
  );

  const triggerSend = useCallback(async () => {
    if (!toAddress || !amount) {
      return;
    }

    setSending(true);
    const { isError } = await withErrorHandling(() =>
      transferApi.send({
        amount,
        to: toAddress,
        tokenSymbol: selectedToken?.symbol,
      })
    );
    setSending(false);

    if (!isError) {
      toast.success("Transfer initiated successfully");

      // TODO: clear nav history and go to /
      window.history.replaceState(null, "", "/");
      navigate("/dashboard", { replace: true });
    }
  }, [toAddress, amount, selectedToken?.symbol, navigate]);

  return {
    step,
    token,
    walletAddressForm,
    amountForm,
    toAddress,
    amount,
    loadingGasFee,
    priceData,
    selectedToken,
    sending,
    submitWalletAddress,
    submitAmount,
    triggerSend,
  };
};
