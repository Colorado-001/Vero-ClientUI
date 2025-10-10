/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/auth/auth.store";
import { useEffect, useState } from "react";
import { MainLayout } from "../components/layout";
import { CreateUsername } from "../features/onboard";
import { withErrorHandling } from "../utils/error";

export const withEnsureAccountSetup = (
  WrappedComponent: React.ComponentType<any>
) => {
  return () => {
    const [loading, setLoading] = useState(true);
    const { isAuthenticated, user, loadProfile } = useAuthStore();

    useEffect(() => {
      (async () => {
        if (!user && isAuthenticated) {
          await withErrorHandling(loadProfile);
        }
        setLoading(false);
      })();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!isAuthenticated) {
      return <Navigate to="/auth" replace />;
    }

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!user) {
      // could happen during initial profile fetch
      return <div>Loading profile...</div>;
    }

    if (!user.username) {
      return (
        <MainLayout>
          <CreateUsername />
        </MainLayout>
      );
    }

    return <WrappedComponent />;
  };
};
