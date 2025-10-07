import type React from "react";

interface IProps {
  count: number;
  active: number;
}

export const CarouselIndicator: React.FC<IProps> = ({ count, active }) => {
  return (
    <div className="flex space-x-2 mt-4 justify-center">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`w-[4px] h-2.5 rounded-full transition-all duration-300 ${
            i === active ? "bg-white scale-125" : "bg-gray-500 opacity-70"
          }`}
        />
      ))}
    </div>
  );
};
