import { useNavigate } from "react-router-dom";
import { RoundedButton } from "../../../components";
import { appNavigate } from "../../../utils/routing";
import { useSavingStore } from "../../../store";
import { useEffect } from "react";
import { AutoFlowCard, ShimmerAutoFlowCardList } from "../components";

export const AutoflowHome = () => {
  const navigate = useNavigate();

  const { loadingAutoFlows, autoFlows, loadAutoFlows } = useSavingStore();

  useEffect(() => {
    loadAutoFlows();
  }, [loadAutoFlows]);

  return (
    <div className="pt-[90px] px-6">
      <p className="text-[14px] text-[#6B7280] text-start mb-4">
        Create time or market based rules to automate savings, transfers, or
        buys.
      </p>

      <RoundedButton
        label="Create New Rule"
        className="w-full"
        onClick={() => appNavigate(navigate, "newAutoflow")}
      />

      <div className="mt-8">
        <p className="text-[#F9FAFB] text-[16px] leading-[28px] mb-2">
          Automated Transactions
        </p>

        {loadingAutoFlows ? (
          <ShimmerAutoFlowCardList count={6} />
        ) : (
          <div className="space-y-6">
            {autoFlows.map((a) => (
              <AutoFlowCard {...a} key={a.id.toString()} />
            ))}
          </div>
        )}

        {!loadingAutoFlows && autoFlows.length === 0 && (
          <div className="w-full py-10 text-center text-[#6B7280] text-[15px]">
            No flows found
          </div>
        )}
      </div>
    </div>
  );
};
