import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { RadialGradientBg } from "./radial-gradient-bg";
import { appNavigate } from "../../utils/routing";

export const SplashScreen: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      appNavigate(navigate, "home");
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <RadialGradientBg>
      <div className="flex-1 flex flex-col items-center justify-center">
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-white font-bold italic text-[64px] text-center z-[50]"
          style={{ fontFamily: "JetBrains_Mono" }}
        >
          Vero
        </motion.h1>
      </div>
    </RadialGradientBg>
  );
};
