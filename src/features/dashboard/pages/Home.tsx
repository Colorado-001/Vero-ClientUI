import React from "react";
import { RoundedButton } from "../../../components";
import { useAuthStore } from "../../../store/auth/auth.store";

export const Home: React.FC = () => {
  const { logout } = useAuthStore();
  return (
    <div>
      <div className="flex flex-col text-white flex-1 justify-center items-center text-2xl">
        Welcome to Home 🎉
      </div>

      <RoundedButton onClick={logout} label="Logout" />
    </div>
  );
};
