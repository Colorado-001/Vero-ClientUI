import { motion } from "motion/react";
import { PinInputWithKeypad, RoundedButton } from "../../../components";
import { useVerifyOtp } from "../hooks";
import { useState } from "react";

export const VerifyOtpPage = () => {
  const [code, setCode] = useState("");
  const { handleComplete, loading } = useVerifyOtp();

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
          Verify Email
        </h1>

        <p className="text-base text-center text-[#F9FAFB] leading-relaxed max-w-sm">
          We've sent a verification code to your email. Verify your email to
          secure your wallet and ensure you can recover access on any device.
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
          onComplete={handleComplete}
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
              handleComplete(code);
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
