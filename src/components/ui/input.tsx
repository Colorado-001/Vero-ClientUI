import classNames from "classnames";
import React, { type ReactNode } from "react";

type InputProps = React.ComponentPropsWithoutRef<"input"> & {
  suffixIcon?: ReactNode;
  prefixIcon?: ReactNode;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ suffixIcon, prefixIcon, className, ...props }, ref) => (
    <div
      className={classNames(
        "w-full bg-[#1A1C22] text-white rounded-[50px] px-[20px] h-[50px] flex flex-row gap-2 items-center"
      )}
    >
      {prefixIcon && prefixIcon}
      <input
        ref={ref}
        className={classNames(
          "placeholder:text-[#6B7280] text-sm py-[4px] flex-1 outline-none",
          className
        )}
        {...props}
      />
      {suffixIcon && suffixIcon}
    </div>
  )
);
