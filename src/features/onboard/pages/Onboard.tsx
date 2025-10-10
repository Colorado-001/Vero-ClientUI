import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import classnames from "classnames";

import onboard1 from "../../../assets/images/onboard1.png";
import onboard2 from "../../../assets/images/onboard2.png";
import onboard3 from "../../../assets/images/onboard3.png";
import { RoundedButton } from "../../../components";
import { useUtilStore } from "../../../store";
import { useNavigate } from "react-router-dom";
import { appNavigate } from "../../../utils/routing";

const slides = [
  {
    image: onboard1,
    title: "Welcome to Vero Wallet",
    description:
      "Take control of your digital assets securely and conveniently with Vero wallet, your gateway to decentralized finance ",
  },
  {
    image: onboard2,
    title: "Automate Your Money",
    description:
      "Set savings goals, automate deposits, or trigger actions when the market moves. Your wallet's now smart enough to save while you sleep.",
  },
  {
    image: onboard3,
    title: "Share control, stay in charge",
    description:
      "Give trusted friends or bots weekly allowances, approve group payments, or manage funds together, safely and transparently.",
  },
];

export const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const { markOnboarded } = useUtilStore();

  const [index, setIndex] = useState(0);

  const next = () => {
    if (index < slides.length - 1) setIndex(index + 1);
    else handleSkip();
  };

  const handleSkip = () => {
    markOnboarded();
    appNavigate(navigate, "home");
  };

  return (
    <div className="flex-1 flex flex-col items-center flex-1 text-white px-6 py-6">
      {/* Image */}
      <div className="flex items-center justify-center w-full">
        <AnimatePresence mode="wait">
          <motion.img
            key={slides[index].image}
            src={slides[index].image}
            alt={slides[index].title}
            className="w-[500px] h-[400px] object-contain"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5 }}
            loading="eager"
          />
        </AnimatePresence>
      </div>

      {/* Indicators */}
      <div className="flex items-center space-x-1">
        {slides.map((_, i) => (
          <div
            key={i}
            className={classnames(
              `w-[4px] rounded-md ${
                i === index ? "bg-[#6C4EFF]" : "bg-[#F2F2F2]"
              } transition-all`,
              {
                "h-[16px]": i !== 1,
                "h-[24px]": i === 1,
              }
            )}
          />
        ))}
      </div>

      {/* Title + Description */}
      <motion.div
        key={slides[index].title}
        className="text-center space-y-3 mt-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2
          className="text-2xl font-bold"
          style={{ fontFamily: "JetBrains_Mono" }}
        >
          {slides[index].title}
        </h2>
        <p className="text-[#F9FAFB] text-base max-w-sm mx-auto font-normal">
          {slides[index].description}
        </p>
      </motion.div>

      {/* Buttons */}
      <div className="flex flex-col items-center w-full mt-8 gap-4">
        <RoundedButton label="Next" onClick={next} className="w-full" />

        <RoundedButton
          variant="text"
          label="Skip"
          onClick={handleSkip}
          className="w-full"
        />
      </div>
    </div>
  );
};
