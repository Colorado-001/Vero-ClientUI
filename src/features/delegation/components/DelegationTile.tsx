import type React from "react";
import type { DelegationSummaryDto } from "../../../types/models";
import SvgIcon from "../../../components/ui/svg-icon";
import { AppIcons } from "../../../assets/svg";

export const DelegationTile: React.FC<DelegationSummaryDto> = (props) => {
  const { amountLimit, name, type, frequency } = props;

  return (
    <div className="bg-[#1A1C22] w-full rounded-[20px] py-[16px] px-[12px] gap-[16px] flex flex-row items-center">
      <div className="flex-1 space-y-[4px] text-[#6B7280] text-[14px]">
        <p className="text-[#F9FAFB] text-[16px]">{name}</p>

        <p>Type: {type[0].toUpperCase() + type.slice(1)}</p>
        <p>
          Limit: {amountLimit} MON {frequency}
        </p>
        <p>Last Action: N/A</p>
      </div>

      <SvgIcon
        icon={AppIcons["MoreVertical"]}
        className="text-[#F9FAFB]"
        size={26}
      />
    </div>
  );
};

export const Shimmer: React.FC = () => {
  return (
    <div className="bg-[#1A1C22] w-full rounded-[20px] py-[16px] px-[12px] gap-[16px] flex flex-row items-center shimmer">
      {/* Main content area */}
      <div className="flex-1 space-y-[16px]">
        {/* Name shimmer */}
        <div className="space-y-[8px]">
          <div className="h-[20px] bg-gray-700 rounded-[8px] w-3/4 shimmer"></div>
          <div className="h-[16px] bg-gray-700 rounded-[6px] w-1/2 shimmer"></div>
        </div>

        {/* Details shimmer */}
        <div className="space-y-[12px]">
          <div className="h-[14px] bg-gray-700 rounded-[4px] w-full shimmer"></div>
          <div className="h-[14px] bg-gray-700 rounded-[4px] w-4/5 shimmer"></div>
          <div className="h-[14px] bg-gray-700 rounded-[4px] w-3/4 shimmer"></div>
        </div>
      </div>

      {/* Icon shimmer */}
      <div className="h-[26px] w-[26px] bg-gray-700 rounded-[6px] shimmer"></div>
    </div>
  );
};

export const ShimmerDelegateTileList: React.FC<{ count?: number }> = ({
  count = 3,
}) => {
  return (
    <div className="space-y-[16px]">
      {Array.from({ length: count }, (_, index) => (
        <Shimmer key={index} />
      ))}
    </div>
  );
};
