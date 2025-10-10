import { motion } from "motion/react";
import { UsernameForm } from "../components";

export const CreateUsername = () => {
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
          Create Username
        </h1>

        <p className="text-base text-center text-[#F9FAFB] leading-relaxed max-w-sm">
          Personalize your account with a unique name. Username can be changed
          later
        </p>
      </motion.div>

      <motion.div
        className="w-full mt-8 flex-1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <UsernameForm />
      </motion.div>
    </motion.div>
  );
};
