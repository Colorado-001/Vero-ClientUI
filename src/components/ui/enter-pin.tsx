import { motion } from "motion/react";
import type React from "react";
import { RoundedButton } from "./rounded-button";
import { PinInputWithKeypad } from "./pin-with-keypad";
import { useState } from "react";

interface IProps {
  onComplete: (pin: string) => void;
  message?: string;
  loading?: boolean;
}

export const EnterPin: React.FC<IProps> = ({
  onComplete,
  message,
  loading,
}) => {
  const [code, setCode] = useState("");

  return (
    <motion.div
      className="z-10 flex flex-col items-center flex-1 text-white px-6 py-6 pt-16"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Header */}
      <motion.div
        className="flex flex-col items-center gap-y-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h1
          className="text-2xl font-bold text-white text-center"
          style={{ fontFamily: "JetBrains_Mono" }}
        >
          Verify Pin
        </h1>

        <p className="text-base text-center text-[#F9FAFB] leading-relaxed max-w-sm">
          {message || "Please enter your transaction pin to proceed"}
        </p>
      </motion.div>

      {/* Pin Input */}
      <motion.div
        className="mt-8 w-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <PinInputWithKeypad
          length={6}
          onComplete={onComplete}
          autoFocus
          secure={false}
          disabled={loading}
          onChange={setCode}
        />
      </motion.div>

      {/* Continue Button */}
      <motion.div
        className="mt-8 w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <RoundedButton
          onClick={() => {
            if (code.length === 6) {
              onComplete(code);
            }
          }}
          label="Continue"
          loading={loading}
          className="w-full"
        />
      </motion.div>
    </motion.div>
  );
};
