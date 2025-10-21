import type React from "react";
import type { AutoflowSavingDto } from "../../../types/models";
import SvgIcon from "../../../components/ui/svg-icon";
import { AppIcons } from "../../../assets/svg";
import { Interaction, Popover } from "../../../components";
import { useRef, useState } from "react";
import { FlowPopUpMenu } from "./FlowPopUpMenu";

export const AutoFlowCard: React.FC<AutoflowSavingDto> = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { name, frequency, dayOfMonth, amountToSave, tokenToSave, progress } =
    props;

  const getDaySuffix = (day: number): string => {
    if (day >= 11 && day <= 13) {
      return "th";
    }
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const getFrequencyText = () => {
    if (frequency === "every_n_minutes") {
      if (dayOfMonth === 1) {
        return "Every minute";
      }

      return `Every ${dayOfMonth} minutes`;
    }

    if (frequency === "monthly") {
      // 1st, 2nd, 3rd, 4th... 31st of each month
      if (dayOfMonth > 28) {
        return "On the last day of each month";
      }
      return `On the ${dayOfMonth}${getDaySuffix(dayOfMonth)} of each month`;
    }
  };

  const toggleMenu = (val: boolean) => () => {
    setIsMenuOpen(val);
  };

  const moreRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <div className="bg-[#1A1C22] w-full rounded-[20px] py-[16px] px-[12px] gap-[16px] flex flex-row items-center">
        <div className="flex-1 space-y-[4px] text-[#6B7280] text-[14px]">
          <p className="text-[#F9FAFB] text-[16px]">{name}</p>

          <p>Trigger: Time-Based ({getFrequencyText()})</p>
          <p>
            Action: Send {amountToSave} {tokenToSave}
          </p>
          <p>
            Next Run: {new Date(progress.nextScheduledDate).toLocaleString()}
          </p>
        </div>

        <Interaction ref={moreRef} onClick={toggleMenu(true)}>
          <SvgIcon
            icon={AppIcons["MoreVertical"]}
            className="text-[#F9FAFB]"
            size={26}
          />
        </Interaction>
      </div>

      <Popover
        isOpen={isMenuOpen}
        onClose={toggleMenu(false)}
        anchorEl={moreRef.current}
      >
        <FlowPopUpMenu {...props} onClose={toggleMenu(false)} />
      </Popover>
    </>
  );
};

export const ShimmerAutoFlowCard: React.FC = () => {
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

export const ShimmerAutoFlowCardList: React.FC<{ count?: number }> = ({
  count = 3,
}) => {
  return (
    <div className="space-y-[16px]">
      {Array.from({ length: count }, (_, index) => (
        <ShimmerAutoFlowCard key={index} />
      ))}
    </div>
  );
};
