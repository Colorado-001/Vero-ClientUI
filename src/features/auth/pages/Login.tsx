import { AnimatePresence, motion } from "motion/react";

import createAccountImg from "../../../assets/images/add_wallet.png";
import { LoginForm } from "../components";

export const LoginPage = () => {
  return (
    <div className="text-white">
      <div className="flex-1 z-10 flex flex-col items-center flex-1 text-white px-6 py-6">
        <div className="flex items-center justify-center w-full">
          <AnimatePresence mode="wait">
            <motion.img
              src={createAccountImg}
              alt={"Login"}
              className="w-[500px] h-[300px] object-contain"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5 }}
            />
          </AnimatePresence>
        </div>

        {/** Title + Description */}
        <motion.div
          className="text-center space-y-3 mt-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2
            className="text-2xl font-bold text-white"
            style={{ fontFamily: "JetBrains_Mono" }}
          >
            Login
          </h2>
          <p className="text-[#F9FAFB] text-base max-w-sm mx-auto font-normal">
            Welcome back! Sign in with your email and dive right back into Web3.
          </p>
        </motion.div>

        {/** Email Signup Form */}
        {/** Animated Email Signup Form */}
        <motion.div
          className="w-full mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <LoginForm />
        </motion.div>
      </div>
    </div>
  );
};
