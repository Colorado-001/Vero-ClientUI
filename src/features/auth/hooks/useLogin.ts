import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuthStore } from "../../../store/auth/auth.store";
import { loginFormSchema, type TLoginForm } from "../schemas";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { appNavigate } from "../../../utils/routing";
import { withErrorHandling } from "../../../utils/error";

export const useLogin = () => {
  const navigate = useNavigate();
  const { authLoading: loading, login } = useAuthStore();

  const form = useForm<TLoginForm>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = useCallback(
    async (data: TLoginForm) => {
      const { isError, data: res } = await withErrorHandling(() =>
        login(data.email)
      );

      if (!isError) {
        appNavigate(navigate, "verifyOtp", { token: res!, action: "login" });
      }
    },
    [login, navigate]
  );

  return {
    onSubmit,
    form,
    loading,
  };
};
