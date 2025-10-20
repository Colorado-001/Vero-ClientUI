import { useNavigate } from "react-router-dom";
import { RoundedButton } from "../../../components";
import { appNavigate } from "../../../utils/routing";
import { useDelegationStore } from "../../../store/delegation/delegation.store";
import { useEffect } from "react";
import { DelegationTile, ShimmerDelegateTileList } from "../components";

export const DelegationHomePage = () => {
  const navigate = useNavigate();

  const { loadDelegations, loadingDelegations, delegations } =
    useDelegationStore();

  useEffect(() => {
    loadDelegations();
  }, [loadDelegations]);

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

        {loadingDelegations ? (
          <ShimmerDelegateTileList count={6} />
        ) : (
          <div className="space-y-6">
            {delegations.map((a) => (
              <DelegationTile {...a} key={a.id} />
            ))}
          </div>
        )}

        {!loadingDelegations && delegations.length === 0 && (
          <div className="w-full py-10 text-center text-[#6B7280] text-[15px]">
            No flows found
          </div>
        )}
      </div>
    </div>
  );
};
