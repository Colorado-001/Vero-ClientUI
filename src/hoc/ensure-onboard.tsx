/* eslint-disable @typescript-eslint/no-explicit-any */
import { useUtilStore } from "../store";
import { Onboarding } from "../features/onboard";
import { MainLayout } from "../components/layout";

export const withEnsureOnboard = (
  WrappedComponent: React.ComponentType<any>
) => {
  return () => {
    const { hasOnboarded } = useUtilStore();

    if (!hasOnboarded) {
      return (
        <MainLayout>
          <Onboarding />
        </MainLayout>
      );
    }

    return <WrappedComponent />;
  };
};
