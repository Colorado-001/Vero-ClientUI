import type React from "react";
import { motion } from "motion/react";
import { AppIcons } from "../../../assets/svg";
import SvgIcon from "../../../components/ui/svg-icon";

interface IProps {
  amount: number | null;
  loading: boolean;
}

export const Balance: React.FC<IProps> = ({ loading, amount: usdBalance }) => {
  return (
    <div className="relative flex flex-col justify-center items-center pt-8">
      {/* Blurred background layer */}
      <motion.div
        className="absolute top-[30px] w-[284px] h-[128px] bg-[#6C4EFF] blur-[90px]"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={
          loading
            ? { opacity: [0.4, 0.8, 0.4], scale: [0.7, 1, 0.7] } // pulse sequence
            : { opacity: 1, scale: 1 } // stop pulsing
        }
        transition={
          loading
            ? {
                duration: 1,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
              }
            : {
                duration: 0.6,
                ease: "easeOut",
                delay: 0.4,
              }
        }
      />

      {/* Foreground content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{
          opacity: loading ? 0.6 : 1,
          scale: loading ? 0.98 : 1,
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 flex flex-col justify-center items-center"
      >
        <p className="text-[#6B7280] text-[14px] text-center">
          Current Balance
        </p>

        <motion.h1
          key="usd-balance"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-[#F9FAFB] font-bold text-center text-[40px]"
        >
          ${(usdBalance || 0).toLocaleString()}
        </motion.h1>

        {!loading && (
          <motion.div
            animate={
              loading
                ? {
                    opacity: [0.6, 1, 0.6],
                    scale: [0.98, 1, 0.98],
                  }
                : { opacity: 1, scale: 1 }
            }
            transition={
              loading
                ? { duration: 1.2, ease: "easeInOut", repeat: Infinity }
                : { duration: 0.5 }
            }
            className="text-success text-small flex items-center gap-1 mt-1"
          >
            <SvgIcon icon={AppIcons.ArrowUp} className="inline" /> 2.8% (1d)
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
