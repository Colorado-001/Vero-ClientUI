import { useNavigate } from "react-router-dom";
import { RoundedButton } from "../../../components";
import { appNavigate } from "../../../utils/routing";

export const DelegationHomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="px-6 pt-[90px]">
      <p className="text-[14px] text-[#6B7280] text-start mb-4">
        Create time or market based rules to automate savings, transfers, or
        buys.
      </p>

      <RoundedButton
        label="Create New Delegation"
        className="w-full"
        onClick={() => appNavigate(navigate, "newDelegation")}
      />

      <div className="mt-8">
        <p className="text-[#F9FAFB] text-[16px] leading-[28px] mb-2">
          Delegations
        </p>
      </div>
    </div>
  );
};
