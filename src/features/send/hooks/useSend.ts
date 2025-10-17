import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import type { SendStep } from "../types";
import { SEND_STEPS } from "../constants";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  selectWalletAddressSchema,
  type SelectWalletAddressSchema,
} from "../schemas";

export const useSend = () => {
  const navigate = useNavigate();
  const { token } = useParams<{ token?: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  // Get step from URL, default to "enter-wallet"
  const initialStep = useMemo<SendStep>(() => {
    const stepFromUrl = searchParams.get("step") as SendStep | null;
    if (!stepFromUrl) return "enter-wallet";
    return SEND_STEPS.includes(stepFromUrl) ? stepFromUrl : "enter-wallet";
  }, [searchParams]);

  const initialWalletAddress = useMemo<string>(() => {
    const address = searchParams.get("to");
    return address || "";
  }, [searchParams]);

  const [step, setStep] = useState<SendStep>(initialStep);
  const [walletAddress, setWalletAddress] = useState(initialWalletAddress);

  // Redirect if no token --> token is crypto type being sent ;)
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  // Keep URL synced with state
  useEffect(() => {
    setSearchParams({ step });
  }, [step, setSearchParams]);

  useEffect(() => {
    setSearchParams({ to: walletAddress });
  }, [walletAddress, setSearchParams]);

  const nextStep = useCallback(() => {
    const currentIndex = SEND_STEPS.indexOf(step);
    if (currentIndex < SEND_STEPS.length - 1) {
      setStep(SEND_STEPS[currentIndex + 1]);
    }
  }, [step]);

  const prevStep = useCallback(() => {
    const currentIndex = SEND_STEPS.indexOf(step);
    if (currentIndex > 0) {
      setStep(SEND_STEPS[currentIndex - 1]);
    }
  }, [step]);

  const walletAddressForm = useForm({
    resolver: zodResolver(selectWalletAddressSchema),
    defaultValues: {
      address: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const submitWalletAddress = useCallback(
    (data: SelectWalletAddressSchema) => {
      setWalletAddress(data.address);
      nextStep();
    },
    [nextStep]
  );

  return { step, token, walletAddressForm, submitWalletAddress, prevStep };
};
