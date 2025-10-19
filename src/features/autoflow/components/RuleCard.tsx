import type React from "react";
import { motion } from "motion/react";
import { AppIcons } from "../../../assets/svg";
import SvgIcon from "../../../components/ui/svg-icon";
import classNames from "classnames";

interface IProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export const RuleCard: React.FC<IProps> = (props) => {
  const { label, onClick, disabled = false } = props;

  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      whileTap={
        !disabled
          ? {
              scale: 0.98,
            }
          : undefined
      }
      className={classNames(
        "w-full bg-[#1A1C22] py-[20px] px-[32px] rounded-[20px] gap-[20px] flex flex-col items-center text-[#F9FAFB]",
        { "opacity-[0.6]": disabled },
        { "cursor-pointer": !disabled }
      )}
    >
      <SvgIcon icon={AppIcons["Clock"]} size={24} />

      <p>{label}</p>
    </motion.button>
  );
};
