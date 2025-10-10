import { useCallback } from "react";
import { useParams } from "react-router-dom";
import { useAuthStore } from "../../../store/auth/auth.store";
import { withErrorHandling } from "../../../utils/error";
import type { ErrorHandlerOptions } from "../../../types/error";

export const useVerifyOtp = () => {
  const { authLoading, verifyEmailSignup, verifyLogin } = useAuthStore();
  const { action, token } = useParams();

  const handleVerifySignup = useCallback(
    async (token: string, code: string) => {
      const options: ErrorHandlerOptions = {
        showToast: true,
      };

      await withErrorHandling(async () => {
        await verifyEmailSignup(token, code);
      }, options);
    },
    [verifyEmailSignup]
  );

  const handleVerifyLogin = useCallback(
    async (token: string, code: string) => {
      await withErrorHandling(() => verifyLogin(token, code));
    },
    [verifyLogin]
  );

  const handleComplete = useCallback(
    async (code: string) => {
      if (!token) return;

      if (action === "signup") {
        await handleVerifySignup(token, code);
      } else if (action === "login") {
        await handleVerifyLogin(token, code);
      }
    },
    [token, action, handleVerifySignup, handleVerifyLogin]
  );

  return { handleComplete, loading: authLoading };
};
