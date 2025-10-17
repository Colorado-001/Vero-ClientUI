import type { Path, UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import type { ReactNode } from "react";
import { Input } from "./input";

interface IProps<T extends object> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  className?: string;
  suffixIcon?: ReactNode;
}

export const FormInput = <T extends object>({
  label,
  form,
  name,
  placeholder,
  className,
  suffixIcon,
}: IProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-1">
          {label && (
            <FormLabel className="text-[#F9FAFB] text-sm mb-1 inline-block">
              {label}
            </FormLabel>
          )}

          <FormControl
            as={Input}
            className={className}
            placeholder={placeholder}
            suffixIcon={suffixIcon}
            {...field}
          />
          <FormMessage className="text-red-500" />
        </FormItem>
      )}
    />
  );
};
