import {
  withEnsureAccountSetup,
  withEnsureAuthenticated,
  withEnsureOnboard,
} from "../../hoc";
import { MainLayout } from "./main";

const Layout = () => {
  return <MainLayout />;
};

export const AuthenticatedLayout = withEnsureAccountSetup(
  withEnsureAuthenticated(withEnsureOnboard(Layout))
);
