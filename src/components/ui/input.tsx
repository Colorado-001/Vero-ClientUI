import classNames from "classnames";
import React from "react";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={classNames(
      "w-full bg-[#1A1C22] text-white placeholder:text-[#6B7280] text-sm rounded-[50px] py-[4px] px-[20px]",
      className
    )}
    {...props}
  />
));
