import React from "react";
import { Balance, DashboardActions, MyAssets } from "../components";
import { usePortfolio } from "../../../hooks";

export const Home: React.FC = () => {
  const { assets, usdBalance, loading } = usePortfolio();

  return (
    <div className="text-white flex-1 flex flex-col gap-6 pb-8 overflow-hidden">
      <div className="w-full flex flex-col px-8 py-6 justify-start items-center">
        <Balance loading={loading} amount={usdBalance} />

        {/** Actions */}
        <div className="mt-8">
          <DashboardActions disabled={loading} />
        </div>
      </div>

      <div className="flex-1 w-full bg-[#1A1C2280] py-[43px] px-[24px] rounded-t-[40px] space-y-8 pb-[120px] overflow-y-auto scrollbar-hide relative">
        <h5 className="text-[20px] text-[#F9FAFB]">My Wallets</h5>

        {/** Assets */}
        <MyAssets loading={loading} assets={assets} />
      </div>
      {/* <RoundedButton onClick={logout} label="Logout" /> */}
    </div>
  );
};
