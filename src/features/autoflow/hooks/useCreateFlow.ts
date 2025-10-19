import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createTimeBasedSchema } from "../schema";
import { useCallback } from "react";
import type { CreateTimeBasedSchema } from "../types";

export const useCreateFlow = () => {
  const form = useForm({
    resolver: zodResolver(createTimeBasedSchema),
  });

  const onSubmit = useCallback((data: CreateTimeBasedSchema) => {
    console.log(data);
  }, []);

  return { form, onSubmit };
};
