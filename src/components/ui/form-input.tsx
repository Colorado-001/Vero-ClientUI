import type { Path, UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import classNames from "classnames";

interface IProps<T extends object> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  className?: string;
}

export const FormInput = <T extends object>({
  label,
  form,
  name,
  placeholder,
  className,
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
            className={classNames(
              "w-full h-[50px] bg-[#1A1C22] outline-none border-none text-white placeholder:text-[#6B7280] text-sm rounded-[50px] py-[4px] px-[20px]",
              className
            )}
            placeholder={placeholder}
            {...field}
          />
          <FormMessage className="text-red-500" />
        </FormItem>
      )}
    />
  );
};
