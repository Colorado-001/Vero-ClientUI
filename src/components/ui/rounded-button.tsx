import { motion } from "motion/react";
import type React from "react";

interface ButtonProps {
  label: string;
  type?: "submit" | "button";
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "text";
  onClick?: VoidFunction;
}

export const RoundedButton: React.FC<ButtonProps> = ({
  label,
  variant = "primary",
  className = "",
  type = "button",
  ...rest
}) => {
  const baseStyles =
    "px-6 py-2.5 rounded-[60px] font-semibold text-sm transition-all duration-200 focus:outline-none";

  const variants = {
    primary: "bg-primary text-white",
    secondary: "bg-gray-700 text-white",
    outline: "border border-white text-white hover:bg-white transition-all",
    text: "bg-transparent text-[#6B7280] px-0 py-0",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={variant === "text" ? { opacity: 0.7 } : { scale: 1.05 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      type={type}
      {...rest}
    >
      {label}
    </motion.button>
  );
};
