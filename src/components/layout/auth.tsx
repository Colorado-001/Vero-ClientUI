import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { motion } from "motion/react";
import {
  withEnsureAccountSetup,
  withEnsureAuthenticated,
  withEnsureOnboard,
} from "../../hoc";
import { MainLayout } from "./main";
import { IconButton } from "../ui";
import { useMemo } from "react";
import { appNavigate } from "../../utils/routing";
import { AnimatePresence } from "motion/react";

const Header = () => {
  const navigate = useNavigate();

  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  const left = useMemo(() => {
    if (pathname === "/dashboard")
      return (
        <IconButton
          key={"profile"}
          iconName="Profile"
          onClick={() => appNavigate(navigate, "profile")}
        />
      );

    return (
      <IconButton
        key={"back"}
        iconName="ArrowLeft"
        onClick={() => navigate(-1)}
      />
    );
  }, [navigate, pathname]);

  const { token } = useParams();

  const title = useMemo(() => {
    if (pathname.startsWith("/swap")) {
      return "Swap";
    }

    if (pathname.startsWith("/receive")) {
      return "Receive";
    }

    if (pathname.startsWith("/select-token")) {
      return "Select Token";
    }

    if (pathname.startsWith("/send")) {
      const to = searchParams.get("to");

      if (to) {
        return "Enter Amount";
      }

      if (token) {
        return token.toUpperCase();
      }
    }

    return null;
  }, [pathname, token, searchParams]);

  const showNotificationIcon = ["/dashboard", "/swap"].some((path) =>
    pathname.startsWith(path)
  );

  return (
    <div className="absolute top-0 left-0 w-full p-8 bg-transparent flex flex-row items-center justify-between">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={left.key}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
          transition={{ duration: 0.25 }}
        >
          {left}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {title && (
          <motion.p
            key={title}
            className="text-center text-[20px] text-[#F9FAFB] leading-[28px]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {title}
          </motion.p>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {showNotificationIcon ? (
          <IconButton key={"notification"} iconName="Notification" />
        ) : (
          <div key="none" className="w-[50px]" />
        )}
      </AnimatePresence>
    </div>
  );
};

const Layout = () => {
  return <MainLayout top={<Header />} />;
};

export const AuthenticatedLayout = withEnsureAccountSetup(
  withEnsureAuthenticated(withEnsureOnboard(Layout))
);
