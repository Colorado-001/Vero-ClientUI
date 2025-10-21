import type React from "react";
import type { NotificationDto } from "../../types/models";
import SvgIcon from "../../components/ui/svg-icon";
import { AppIcons } from "../../assets/svg";

export const NotificationCard: React.FC<NotificationDto> = (props) => {
  const { level, message, createdAt } = props;

  const getIcon = () => {
    switch (level) {
      case "success":
        return (
          <SvgIcon
            icon={AppIcons["TickSquare"]}
            className="text-[#24D682]"
            size={32}
          />
        );

      case "warning":
        return (
          <SvgIcon
            icon={AppIcons["Warning"]}
            className="text-[#FF9F0A]"
            size={32}
          />
        );

      case "critical":
        return (
          <SvgIcon
            icon={AppIcons["Danger"]}
            className="text-[#FF5A5A]"
            size={32}
          />
        );
    }
  };

  return (
    <div className="py-[16px] px-[12px] rounded-[20px] gap-[16px] flex flex-row items-center bg-[#1A1C22]">
      {getIcon()}

      <div>
        <p className="text-[16px] text-[#F9FAFB] leading-[28px]">{message}</p>
        <p className="text-[#6B7280] text-[14px]">
          {new Date(createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export const ShimmerNotificationCard: React.FC = () => {
  return (
    <div className="bg-[#1A1C22] w-full rounded-[20px] py-[16px] px-[12px] gap-[16px] flex flex-row items-center shimmer">
      {/* Icon shimmer */}
      <div className="h-[24px] w-[24px] bg-gray-700 rounded-[6px] shimmer"></div>

      {/* Content area */}
      <div className="flex-1 space-y-[12px]">
        {/* Message shimmer */}
        <div className="h-[16px] bg-gray-700 rounded-[8px] w-full shimmer"></div>
        <div className="h-[16px] bg-gray-700 rounded-[8px] w-4/5 shimmer"></div>

        {/* Date shimmer */}
        <div className="h-[14px] bg-gray-700 rounded-[6px] w-1/3 shimmer"></div>
      </div>
    </div>
  );
};

export const ShimmerNotificationCardList: React.FC<{ count?: number }> = ({
  count = 5,
}) => {
  return (
    <div className="space-y-[16px]">
      {Array.from({ length: count }, (_, index) => (
        <ShimmerNotificationCard key={index} />
      ))}
    </div>
  );
};
