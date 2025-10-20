import type { Path, UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import type { ReactNode, Ref } from "react";
import { Input } from "./input";
import {
  Dropdown,
  type DropdownActions,
  type DropdownOption,
} from "./dropdown";

interface IProps<T extends object> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  suffixIcon?: ReactNode;
  type?: "date" | "text";
}

export const FormInput = <T extends object>({
  label,
  form,
  name,
  placeholder,
  className,
  suffixIcon,
  type = "text",
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
            type={type}
          />
          <FormMessage className="text-red-500" />
        </FormItem>
      )}
    />
  );
};

interface IDropdownProps<T extends object> extends IProps<T> {
  customSelect?: ReactNode;
  options: DropdownOption[];
  portalTarget?: string;
  dropdownRef?: Ref<DropdownActions>;
}

export const FormDropDown = <T extends object>(props: IDropdownProps<T>) => {
  const {
    form,
    name,
    label,
    className,
    portalTarget,
    placeholder,
    options,
    dropdownRef,
    customSelect,
    disabled,
  } = props;

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
            as={Dropdown}
            {...field}
            disabled={disabled}
            ref={dropdownRef}
            className={className}
            placeholder={placeholder}
            options={options}
            customSelect={customSelect}
            portalTarget={portalTarget}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onChange={(value: any) => form.setValue(name, value)}
          />
          <FormMessage className="text-red-500" />
        </FormItem>
      )}
    />
  );
};
