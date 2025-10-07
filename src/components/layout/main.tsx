import type React from "react";
import { Outlet } from "react-router-dom";

interface IProps {
  children?: React.ReactNode;
}

export const MainLayout: React.FC<IProps> = ({ children }) => {
  return (
    <div className="bg-[#0F1115] min-h-full flex flex-col">
      {children || <Outlet />}
    </div>
  );
};
