import { useNavigate, useParams } from "react-router-dom";
import { usePortfolio } from "../../hooks";
import { useCallback, useEffect, useState } from "react";
import { Input, MyAssets } from "../ui";
import type { AssetValueDto } from "../../types/wallet";
import SvgIcon from "../ui/svg-icon";
import { AppIcons } from "../../assets/svg";
import { appNavigate } from "../../utils/routing";

export const ACTIONS = ["send", "swap"] as const;
export type SelectTokenActionType = (typeof ACTIONS)[number];

export const SelectTokenPage = () => {
  const [filter, setFilter] = useState("");

  const navigate = useNavigate();
  const { action } = useParams();
  const { assets, loading } = usePortfolio();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (Boolean(action) && !ACTIONS.includes(action! as any)) {
      navigate(-1);
    }
  }, [action, navigate]);

  const onSelect = useCallback(
    (asset: AssetValueDto) => {
      if (!action) return;

      switch (action as SelectTokenActionType) {
        case "send":
          appNavigate(navigate, "send", { token: asset.symbol.toLowerCase() });
          break;

        default:
          break;
      }
    },
    [action, navigate]
  );

  useEffect(() => {
    return () => {
      setFilter("");
    };
  }, []);

  return (
    <div className="pt-[120px] flex-1 flex-col flex">
      <div className="flex-1 flex flex-col gap-10 bg-[#1A1C2280] rounded-t-[40px] py-[32px] px-[24px]">
        <Input
          placeholder="Search token"
          className="text-[18px]"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          prefixIcon={
            <SvgIcon
              icon={AppIcons["SearchNormal"]}
              className="text-[#6B7280]"
              size={24}
            />
          }
        />

        <MyAssets
          assets={assets}
          loading={loading}
          mode="select"
          onSelect={onSelect}
          filter={filter}
        />
      </div>
    </div>
  );
};
