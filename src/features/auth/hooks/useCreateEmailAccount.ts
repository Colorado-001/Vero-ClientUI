import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema, type TLoginForm } from "../schemas";
import { useCallback, useState } from "react";

export const useCreateEmailAccount = () => {
  const [loading] = useState(false);

  const form = useForm<TLoginForm>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = useCallback(async (data: TLoginForm) => {
    console.log("create email account", data);
  }, []);

  return { loading, form, onSubmit };
};
