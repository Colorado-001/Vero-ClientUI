import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createDelegationSchema } from "../schemas";
import { useCallback } from "react";
import type { CreateDelegationSchema } from "../types";
import { useDelegationStore } from "../../../store/delegation/delegation.store";
import { withErrorHandling } from "../../../utils/error";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useCreateDelegation = () => {
  const navigate = useNavigate();

  const { addDelegation, creatingDelegation } = useDelegationStore();

  const form = useForm({
    resolver: zodResolver(createDelegationSchema),
    defaultValues: {
      type: "allowance",
    },
  });

  const onSubmit = useCallback(
    async (data: CreateDelegationSchema) => {
      const { isError } = await withErrorHandling(() => addDelegation(data));

      if (!isError) {
        toast.success("Delegation created successfully");
        navigate(-1);
      }
    },
    [addDelegation, navigate]
  );

  return {
    form,
    onSubmit,
    loading: creatingDelegation,
  };
};
