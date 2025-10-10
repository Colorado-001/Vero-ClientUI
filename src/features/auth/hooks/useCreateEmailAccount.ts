import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema, type TLoginForm } from "../schemas";
import { useCallback } from "react";
import { useAuthStore } from "../../../store/auth/auth.store";
import { withErrorHandling } from "../../../utils/error";
import { useNavigate } from "react-router-dom";
import { appNavigate } from "../../../utils/routing";

export const useCreateEmailAccount = () => {
  const navigate = useNavigate();
  const { authLoading: loading, emailSignup } = useAuthStore();

  const form = useForm<TLoginForm>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = useCallback(
    async (data: TLoginForm) => {
      await withErrorHandling(async () => {
        const token = await emailSignup(data.email);
        appNavigate(navigate, "verifyOtp", { token, action: "signup" });
      });
    },
    [emailSignup, navigate]
  );

  return { loading, form, onSubmit };
};
