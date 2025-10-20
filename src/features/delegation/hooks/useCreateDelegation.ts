import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createDelegationSchema } from "../schemas";
import { useCallback } from "react";
import type { CreateDelegationSchema } from "../types";

export const useCreateDelegation = () => {
  const form = useForm({
    resolver: zodResolver(createDelegationSchema),
    defaultValues: {
      type: "allowance",
    },
  });

  const onSubmit = useCallback(async (data: CreateDelegationSchema) => {
    console.log(data);
  }, []);

  return {
    form,
    onSubmit,
  };
};
