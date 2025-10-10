import { motion } from "motion/react";
import { PinInputWithKeypad, RoundedButton } from "../../../components";
import { useSetupPin } from "../hooks";

export const SetupPin = () => {
  const { codes, handleInputComplete, loading, pinInputRef } = useSetupPin();

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
          {codes[0].length === 0 ? "Create a PIN" : "Enter pin again"}
        </h1>

        <p className="text-base text-center text-[#F9FAFB] leading-relaxed max-w-sm">
          This is used to secure your wallet on all your devices.{" "}
          <span className="text-[#FF5A5A]"> This cannot be recovered</span>
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
          ref={pinInputRef}
          length={6}
          onComplete={handleInputComplete}
          autoFocus
          secure={false}
          disabled={loading}
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
            if (codes.length === 2) {
              handleInputComplete();
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
