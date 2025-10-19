import { useCallback } from "react";
import { RuleCard } from "../components";
import { useNavigate } from "react-router-dom";
import { appNavigate } from "../../../utils/routing";

export const SelectRuleModePage = () => {
  const navigate = useNavigate();

  const onSelect = useCallback(
    (mode: string) => {
      appNavigate(navigate, "createAutoFlowRule", { mode });
    },
    [navigate]
  );

  return (
    <div className="pt-[120px] space-y-14 px-6">
      <p className="text-[14px] text-[#6B7280] text-start">
        Choose a trigger and define what action your wallet should take
        automatically.
      </p>

      <div>
        <p className="text-[#F9FAFB] text-[16px] leading-[28px]">
          Trigger Type
        </p>

        <div className="grid grid-cols-2 gap-4 mt-1">
          <RuleCard label="Time-Based" onClick={() => onSelect("time-based")} />

          <RuleCard
            disabled
            label="Market-Based"
            onClick={() => onSelect("market-based")}
          />
        </div>
      </div>
    </div>
  );
};
