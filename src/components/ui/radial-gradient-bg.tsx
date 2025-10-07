import type React from "react";

interface IProps {
  children: React.ReactNode;
}

export const RadialGradientBg: React.FC<IProps> = ({ children }) => {
  return (
    <div className="h-full w-full bg-[#0F1115] relative flex flex-col">
      <div className="absolute -right-[10px] w-[259px] h-[582.76px] -top-[50.95px] rotate-[24.39deg] bg-[#6C4EFF80] blur-[70px]"></div>
      {children}
    </div>
  );
};
