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
import { FloatingBottomBar, IconButton } from "../ui";
import { useMemo } from "react";
import { appNavigate } from "../../utils/routing";
import { AnimatePresence } from "motion/react";
import type { SendStep } from "../../features/send/types";

const Header = () => {
  const navigate = useNavigate();

  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const { mode } = useParams();

  const left = useMemo(() => {
    if (pathname === "/dashboard")
      return (
        <IconButton
          key={"profile"}
          iconName="Profile"
          disabled
          // onClick={() => appNavigate(navigate, "profile")}
        />
      );

    if (pathname === "/autoflow" || pathname === "/delegations") {
      return null;
    }

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

    if (pathname.startsWith("/notifications")) {
      return "Notifications";
    }

    if (pathname.startsWith("/explorer")) {
      return "Explorer";
    }

    if (pathname.startsWith("/select-token")) {
      return "Select Token";
    }

    if (pathname.startsWith("/send")) {
      const step = searchParams.get("step") as SendStep | null;

      if (step === "enter-amount") {
        return "Enter Amount";
      }

      if (step === "review") {
        return "Summary";
      }

      if (token) {
        return token.toUpperCase();
      }
    }

    if (pathname === "/autoflow") {
      return "Autoflow";
    }

    if (pathname === "/autoflow/new") {
      return "New Rule";
    }

    if (pathname.startsWith("/autoflow/new/")) {
      if (mode === "time-based") {
        return "Time-Based";
      }
    }

    if (pathname === "/delegations") {
      return "Delegations";
    }

    if (pathname === "/delegations/new") {
      return "Delegation Setup";
    }

    return null;
  }, [pathname, searchParams, token, mode]);

  const showNotificationIcon = ["/dashboard", "/swap", "/notifications"].some(
    (path) => pathname.startsWith(path)
  );

  return (
    <div className="absolute top-0 left-0 w-full py-8 px-6 bg-transparent flex flex-row items-center justify-between">
      <AnimatePresence mode="wait" initial={false}>
        {left && (
          <motion.div
            key={left.key}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.25 }}
          >
            {left}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {title && (
          <motion.p
            key={title}
            className="text-center flex-1 text-[20px] text-[#F9FAFB] leading-[28px]"
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
          <IconButton
            key={"notification"}
            iconName="Notification"
            onClick={() => appNavigate(navigate, "notifications")}
          />
        ) : left ? (
          <div key="none" className="w-[50px]" />
        ) : null}
      </AnimatePresence>
    </div>
  );
};

const Layout = () => {
  return <MainLayout top={<Header />} bottom={<FloatingBottomBar />} />;
};

export const AuthenticatedLayout = withEnsureAccountSetup(
  withEnsureAuthenticated(withEnsureOnboard(Layout))
);
