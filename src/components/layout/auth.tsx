import { withEnsureOnboard } from "../../hoc";
import { MainLayout } from "./main";

const Layout = () => {
  return <MainLayout />;
};

export const AuthenticatedLayout = withEnsureOnboard(Layout);
