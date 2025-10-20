import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createTimeBasedSchema } from "../schema";
import { useCallback } from "react";
import type { CreateTimeBasedSchema } from "../types";
import { useSavingStore } from "../../../store";
import { withErrorHandling } from "../../../utils/error";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const useCreateFlow = () => {
  const navigate = useNavigate();

  const { addAutoFlow, creatingAutoFlow } = useSavingStore();

  const form = useForm({
    resolver: zodResolver(createTimeBasedSchema),
  });

  const onSubmit = useCallback(
    async (data: CreateTimeBasedSchema) => {
      const { isError } = await withErrorHandling(() => addAutoFlow(data));
      if (!isError) {
        toast.success("Auto flow created successfully");
        navigate(-2);
      }
    },
    [addAutoFlow, navigate]
  );

  return { form, onSubmit, loading: creatingAutoFlow };
};
