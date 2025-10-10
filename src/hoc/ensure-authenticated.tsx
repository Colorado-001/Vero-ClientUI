/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/auth/auth.store";

export const withEnsureAuthenticated = (
  WrappedComponent: React.ComponentType<any>
) => {
  return () => {
    const { isAuthenticated } = useAuthStore();

    if (!isAuthenticated) {
      return <Navigate to="/auth" />;
    }

    return <WrappedComponent />;
  };
};
