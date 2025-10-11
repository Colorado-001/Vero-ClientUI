import React from "react";
import { RoundedButton } from "../../../components";
import { useAuthStore } from "../../../store/auth/auth.store";
import SvgIcon from "../../../components/ui/svg-icon";
import { AppIcons } from "../../../assets/svg";

export const Home: React.FC = () => {
  const { logout } = useAuthStore();
  return (
    <div className="text-white">
      <div className="w-full flex flex-col p-8 justify-start items-center">
        <div className="relative flex flex-col justify-center items-center pt-8">
          {/* Blurred background layer */}
          <div className="absolute w-[284px] h-[128px] bg-[#6C4EFF] blur-[90px]" />

          {/* Foreground content */}
          <div className="relative z-10 flex flex-col justify-center items-center">
            <p className="text-[#6B7280] text-[14px] text-center">
              Current Balance
            </p>
            <h1 className="text-[#F9FAFB] font-bold text-center text-[40px]">
              $287.00
            </h1>

            <div className="text-success text-small flex items-center gap-1 mt-1">
              <SvgIcon icon={AppIcons.ArrowUp} className="inline" /> 2.8% (1d)
            </div>
          </div>
        </div>

        {/** Actions */}
        <div className="flex flex-row items-center w-full mt-8"></div>
      </div>

      <RoundedButton onClick={logout} label="Logout" />
    </div>
  );
};
