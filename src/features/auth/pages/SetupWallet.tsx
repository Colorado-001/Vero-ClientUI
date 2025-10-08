import { AnimatePresence, motion } from "motion/react";

import { RadialGradientBg, RoundedButton } from "../../../components";

import LockIcon from "../../../assets/svg/lock.svg";
import welcomeImg from "../../../assets/images/welcome.png";
import { useNavigate } from "react-router-dom";
import { appNavigate } from "../../../utils/routing";

export const SetupWallet = () => {
  const navigate = useNavigate();

  return (
    <RadialGradientBg>
      <div className="flex-1 z-10 flex flex-col items-center flex-1 text-white px-6 py-6">
        <div className="flex items-center justify-center w-full">
          <AnimatePresence mode="wait">
            <motion.img
              src={welcomeImg}
              alt={"Welcome"}
              className="w-[500px] h-[400px] object-contain"
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
            Welcome
          </h2>
          <p className="text-[#F9FAFB] text-base max-w-sm mx-auto font-normal">
            Choose how you will like to set up your wallet{" "}
          </p>
        </motion.div>

        {/* Buttons */}
        <div className="flex flex-col items-center w-full mt-12 gap-4">
          <RoundedButton
            label="Continue with email"
            onClick={() => appNavigate(navigate, "createAccountWithEmail")}
            className="w-full"
          />

          {/* <RoundedButton
            label="Import an existing wallet"
            onClick={() => {}}
            className="w-full text-white !bg-[#14161B] !font-normal"
          /> */}
        </div>

        <div className="flex-1"></div>

        <div className="mt-auto border-t border-[#6B72804D] py-[8px] w-full flex flex-col items-center">
          <LockIcon />

          <p className="text-sm text-[#6B7280] text-center">
            Private and secure: Your keys are secured on your device
          </p>
        </div>
      </div>
    </RadialGradientBg>
  );
};
