import React from "react";

interface MobileSizeWrapperProps {
  children: React.ReactNode;
}

export const MobileSizeWrapper: React.FC<MobileSizeWrapperProps> = ({
  children,
}) => {
  return (
    <div className="flex justify-center items-center w-full h-screen bg-gray-100">
      {/* Outer frame */}
      <div
        className="
          w-full h-full
          sm:w-[390px] sm:h-[844px]
          sm:shadow-2xl sm:rounded-[2rem] sm:overflow-hidden sm:border sm:border-gray-200
          bg-white relative
        "
      >
        {/* Scrollable area */}
        <div className="h-full overflow-y-auto no-scrollbar">{children}</div>
      </div>
    </div>
  );
};
