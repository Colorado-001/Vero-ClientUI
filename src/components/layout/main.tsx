import type React from "react";
import { Outlet } from "react-router-dom";

interface IProps {
  children?: React.ReactNode;
  top?: React.ReactNode;
  bottom?: React.ReactNode;
}

export const MainLayout: React.FC<IProps> = ({ children, top, bottom }) => {
  return (
    <div className="relative bg-[#0F1115] min-h-full flex flex-col">
      {top && top}
      {children || <Outlet />}
      {bottom && bottom}
    </div>
  );
};
