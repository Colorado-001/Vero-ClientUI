import { withEnsureAuthenticated, withEnsureOnboard } from "../../hoc";
import { MainLayout } from "./main";

const Layout = () => {
  return <MainLayout />;
};

export const AuthenticatedLayout = withEnsureOnboard(
  withEnsureAuthenticated(Layout)
);
