/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/auth/auth.store";

export const withEnsureUnAuthenticated = (
  WrappedComponent: React.ComponentType<any>
) => {
  return () => {
    const { isAuthenticated } = useAuthStore();

    if (isAuthenticated) {
      return <Navigate to="/dashboard" />;
    }

    return <WrappedComponent />;
  };
};
