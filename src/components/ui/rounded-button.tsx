import { motion } from "motion/react";
import type React from "react";

interface ButtonProps {
  label: string;
  type?: "submit" | "button";
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "text";
  onClick?: VoidFunction;
  loading?: boolean;
  disabled?: boolean;
}

export const RoundedButton: React.FC<ButtonProps> = ({
  label,
  variant = "primary",
  className = "",
  type = "button",
  loading = false,
  disabled = false,
  ...rest
}) => {
  const baseStyles =
    "h-[50px] px-6 py-2.5 rounded-[60px] font-semibold text-sm transition-all duration-200 focus:outline-none flex items-center justify-center gap-2";

  const variants = {
    primary: "bg-primary text-white disabled:opacity-70",
    secondary: "bg-gray-700 text-white disabled:opacity-70",
    outline:
      "border border-white text-white hover:bg-white hover:text-black disabled:opacity-70",
    text: "bg-transparent text-[#6B7280] px-0 py-0 disabled:opacity-70",
  };

  return (
    <motion.button
      whileTap={!loading ? { scale: 0.95 } : undefined}
      whileHover={
        !loading
          ? variant === "text"
            ? { opacity: 0.7 }
            : { scale: 1.05 }
          : undefined
      }
      className={`${baseStyles} ${variants[variant]} ${className}`}
      type={type}
      disabled={loading || disabled}
      {...rest}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
      ) : (
        label
      )}
    </motion.button>
  );
};
