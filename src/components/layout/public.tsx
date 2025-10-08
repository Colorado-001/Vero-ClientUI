import { withEnsureOnboard, withEnsureUnAuthenticated } from "../../hoc";
import { MainLayout } from "./main";

const Layout = () => {
  return <MainLayout />;
};

export const PublicLayout = withEnsureOnboard(
  withEnsureUnAuthenticated(Layout)
);
