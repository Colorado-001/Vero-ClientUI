import { motion } from "motion/react";
import { AppIcons } from "../../assets/svg";
import SvgIcon from "./svg-icon";
import type React from "react";
import type { AppIconType } from "../../types/common";

interface IDashboardActionProps {
  title?: string;
  iconName: AppIconType;
  disabled?: boolean;
  onClick?: VoidFunction;
}

export const IconButton: React.FC<IDashboardActionProps> = ({
  iconName,
  title,
  disabled = false,
  onClick,
}) => {
  return (
    <motion.button
      className="w-fit flex flex-col items-center gap-1"
      type="button"
      disabled={disabled}
      onClick={onClick}
      whileTap={!disabled && onClick ? { scale: 0.95 } : undefined}
      whileHover={!disabled ? { scale: 1.05 } : undefined}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        ease: "easeOut",
      }}
    >
      <div className="w-[50px] h-[50px] rounded-full bg-[#1A1C22] flex justify-center items-center">
        <SvgIcon icon={AppIcons[iconName]} className="text-white" size={28} />
      </div>

      {title && (
        <p className="text-center text-[12px] text-[#F9FAFB] leading-[28px]">
          {title}
        </p>
      )}
    </motion.button>
  );
};
